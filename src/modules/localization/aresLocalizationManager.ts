import {
  ApplicationCommandType,
  BaseManager,
  Collection,
  Locale,
  LocalizationMap,
} from "discord.js";
import { readdir } from "fs/promises";
import path from "path";
import { AresClient } from "../../lib/classes/aresClient";
import {
  AresLocale,
  AresCommandTranslation,
  LocaleCollection,
} from "../../ts/types/types";
import { LoggerScopes } from "../logger/loggerScopes";
import logger from "../logger/logger";
import LocalizationManagerResults from "./results";
import AresLocalizationManagerError from "../../lib/classes/errors/shardingManagerError";

export class AresLocalizationManager extends BaseManager {
  private _locales: LocaleCollection;

  constructor(client: AresClient) {
    super(client);

    this._locales = new Collection();
  }

  get locales() {
    return this._locales;
  }

  /**
   * Returns the locale object of the default locale.
   */
  get defaultLocale() {
    return this._locales.get(Locale.EnglishUS);
  }

  /**
   * Loads directory's locale files.
   * @param directory Path to the locales' directory.
   */
  public async load(directory: string): Promise<void> {
    logger.verbose("[%s] Loading locales", LoggerScopes.LocalizationManager);

    const results = new LocalizationManagerResults();
    const localeFiles = await readdir(directory);
    if (!localeFiles.length) return results.noFiles();

    await localeFiles.reduce(async (p, file) => {
      await p;
      const pathToLocale = path.join(directory, file);
      const locale: AresLocale = (await import(pathToLocale)).default;

      if (AresLocalizationManager.isAresLocale(locale)) {
        if (this._locales.has(locale.locale)) {
          results.addUncached(locale.locale);
          return results.duplicatedArg(locale.locale);
        }

        results.addCached(locale.locale);
        this._locales.set(locale.locale, locale);
      } else {
        results.addUncached(locale);
        return results.notOfType(locale);
      }
    }, Promise.resolve());
    results.displayResults();
  }

  /**
   * Returns the command's default locale.
   */
  public getCommandDefaultLocale(
    commandFileName: string,
    commandType: ApplicationCommandType
  ): AresCommandTranslation {
    const commandLocale = this.defaultLocale?.commands[commandFileName];

    // If the command is not present on the default locale, throw an error.
    if (!commandLocale) {
      throw new AresLocalizationManagerError(
        `Command missing default locale: ${commandFileName}`
      );
    }

    // If the command is a chat input and it's description is missing, throw an error.
    if (
      !commandLocale.description &&
      commandType === ApplicationCommandType.ChatInput
    ) {
      throw new AresLocalizationManagerError(
        `Chat input command's description missing default locale: ${commandFileName}`
      );
    }

    return commandLocale;
  }

  /**
   * Creates and returns a `LocalizationMap` belonging to a specific command.
   */
  public createCommandLocalizationMaps(commandName: string): {
    name_localizations: LocalizationMap | null;
    description_localizations: LocalizationMap | null;
  } {
    let name_localizations = null,
      description_localizations = null;

    name_localizations = this._getCommandLocaleMap(commandName, "name");
    description_localizations = this._getCommandLocaleMap(
      commandName,
      "description"
    );

    return { name_localizations, description_localizations };
  }

  /**
   * Creates and returns a `LocalizationMap` belonging to a specific command's property name.
   */
  private _getCommandLocaleMap = (
    commandFileName: string,
    key: keyof AresCommandTranslation
  ): LocalizationMap | null => {
    const map = {};

    this._locales.map((locale) => {
      // If the default locale is being iterated, skip it.
      if (AresLocalizationManager.isAresBaseLocale(locale.locale)) return;

      // If the command is not present on this locale, return null.
      const value = locale.commands[commandFileName][key];
      if (!value) {
        logger.warn(
          "[%s:%s] Command translation missing on locale: %s [key=%s]",
          LoggerScopes.LocalizationManager,
          locale.locale,
          commandFileName,
          key
        );
        return Object.assign(map, { [locale.locale]: null });
      }

      // If the command is present on this locale, return its value.
      return Object.assign(map, { [locale.locale]: value });
    });

    return map;
  };

  /**
   * Type guard for checking if argument is a locale.
   */
  static isAresLocale(locale: unknown): locale is AresLocale {
    if (!locale || locale.constructor === Array) return false;
    const keys = Object.keys(locale);
    if (keys.includes("locale") && keys.includes("commands")) return true;
    return false;
  }

  /**
   * Checks if locale is ares' default language, which is `Locale.EnglishUS`.
   */
  static isAresBaseLocale(locale: Locale): boolean {
    if (locale == Locale.EnglishUS) return true;
    return false;
  }
}
