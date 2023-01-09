import { Client, ClientOptions } from "discord.js";
import path from "path";
import { AresCommandManager } from "../../modules/commands/aresCommandManager";
import { AresEventManager } from "../../modules/events/eventManager";
import { AresLocalizationManager } from "../../modules/localization/localizationManager";
import logger from "../../modules/logger/logger";
import { LoggerScopes } from "../../modules/logger/loggerScopes";

/** Path to the commands' directory. */
const COMMANDS_PATH = path.join(
  __dirname,
  "../../",
  "modules/commands/commands"
);

export class AresClient extends Client {
  public eventManager;
  public commandManager;
  public localizationManager;

  constructor(opts: ClientOptions) {
    super(opts);

    this.localizationManager = new AresLocalizationManager(this);
    this.eventManager = new AresEventManager(this);
    this.commandManager = new AresCommandManager(this);
  }

  async initManagers(commandsPath = COMMANDS_PATH) {
    await this.localizationManager.init();
    await this.commandManager.load(commandsPath);
    await this.eventManager.init();
  }

  async init(token: string) {
    await this.initManagers();

    logger.verbose(
      "[%s:%s] Client attempting to login",
      LoggerScopes.ShardingManager,
      this.shard?.ids.toString()
    );
    this.login(token);
  }
}
