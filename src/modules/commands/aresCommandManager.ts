import { ApplicationCommandType, Collection, REST, Routes } from "discord.js";
import { readdir } from "fs/promises";
import path from "path";
import {
  ClientConfig,
  SupportGuild,
} from "../../ts/interfaces/config.interface";
import {
  AresApplicationCommandType,
  CommandCollection,
} from "../../ts/types/types";
import { isAresCommand } from "../../util/helpers/stringUtil";
import { LoggerScopes } from "../logger/loggerScopes";
import logger from "../logger/logger";
import CommandManagerResults from "./results";
import config from "config";
import { AresClient } from "../../lib/classes/aresClient";

export class AresCommandManager {
  client: AresClient;
  private _commands: CommandCollection;

  constructor(client: AresClient) {
    this.client = client;
    this._commands = new Collection();
  }

  get commands() {
    return this._commands;
  }

  /**
   * Loads command files.
   * @param directory Path to the commands' directory.
   */
  public async load(directory: string): Promise<void> {
    logger.verbose("[%s] Loading commands", LoggerScopes.CommandsManager);
    const results = new CommandManagerResults();

    const commandTypeDirs = await readdir(directory, {
      withFileTypes: false,
    });
    if (!commandTypeDirs || !commandTypeDirs.length)
      return results.displayResults();

    // Loops through the command type directories.
    await commandTypeDirs.reduce(async (p, typeDir) => {
      await p;
      const commandCategoryDirsPath = path.join(directory, typeDir);
      const commandCategoryDirs = await readdir(commandCategoryDirsPath);
      if (!commandCategoryDirs || !commandCategoryDirs.length) return;

      // Loops through each command category directory found.
      await commandCategoryDirs.reduce(async (p2, categoryDir) => {
        await p2;
        const commandFilesPath = path.join(
          commandCategoryDirsPath,
          categoryDir
        );
        const commandFiles = await readdir(commandFilesPath);
        if (!commandFiles || !commandFiles.length) return;

        // Loads command files from within the current looping directory.
        await commandFiles.reduce(async (p3, file) => {
          await p3;
          const pathToCommand = path.join(commandFilesPath, file);
          let command: AresApplicationCommandType = (
            await import(pathToCommand)
          ).default;

          logger.debug(LoggerScopes.CommandsManager, {
            iterating: command.data.name,
            path: pathToCommand,
          });

          if (!isAresCommand(command)) {
            logger.warn(
              "[%s] Argument is not a command: %s",
              LoggerScopes.CommandsManager,
              command
            );
            return results.addUncached(command);
          }

          if (this._commands.has(command.data.name)) {
            logger.warn(
              "[%s] Duplicated command name: %s",
              LoggerScopes.CommandsManager,
              command.data.name
            );
            return results.addUncached(command);
          }

          // Sets the command's locale data.
          command = this._setCommandLocales(command, file.replace(".js", ""));

          command.data.disabled
            ? results.addDisabled(command)
            : results.addCached(command);

          this._commands.set(command.data.name, command);
        }, Promise.resolve());
      }, Promise.resolve());
    }, Promise.resolve());
    results.displayResults();
  }

  /**
   * Sends a PUT request including commands currently contained in the manager.
   */
  public async putCommands({
    token,
    clientId,
    guildId,
  }: ClientConfig & SupportGuild): Promise<void> {
    const rest = new REST({ version: "10" }).setToken(token);
    const deployment = config.util.getEnv("NODE_ENV") == "production";
    if (!this._commands.size) return;
    logger.info(
      "[%s] Reloading application command(s)",
      LoggerScopes.CommandsManager
    );
    let data;
    try {
      if (deployment) {
        data = await rest.put(Routes.applicationCommands(clientId), {
          body: this._commands.filter((cmd) => !cmd.data.disabled).toJSON(),
        });
      } else {
        data = await rest.put(
          Routes.applicationGuildCommands(clientId, guildId),
          {
            body: this._commands,
          }
        );
      }
    } catch (e) {
      logger.error(e);
    }
    logger.info(
      "[%s] Finished reloading %s application command(s)",
      LoggerScopes.CommandsManager,
      (data as []).length
    );
    logger.debug(LoggerScopes.CommandsManager + ": Request results", {
      data: (data as []).length ? data : "none",
    });
  }

  /**
   * Gathers locale data for the specific command file name and sets it to the command.
   */
  private _setCommandLocales(
    command: AresApplicationCommandType,
    commandFileName: string
  ): AresApplicationCommandType {
    const {
      default_localization,
      name_localizations,
      description_localizations,
    } =
      this.client.localizationManager.createCommandLocalizationMaps(
        commandFileName
      );

    // Sets the default locale and localizations.
    command.data
      .setName(default_localization.name)
      .setDescriptionLocalizations(description_localizations)
      .setNameLocalizations(name_localizations);

    // Sets the description if it's a chat input command.
    if (
      default_localization.description &&
      command.data.type === ApplicationCommandType.ChatInput
    ) {
      command.data.setDescription(default_localization.description);
    }

    return command;
  }
}
