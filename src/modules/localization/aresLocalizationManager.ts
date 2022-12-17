import { BaseManager, Collection, Locale, LocalizationMap } from "discord.js";
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
   * Creates and returns a `LocalizationMap` belonging to a specific command.
   */
  public createCommandLocalizationMaps(commandName: string): {
    name_localizations: LocalizationMap | null;
    description_localizations: LocalizationMap | null;
  } {
    let name_localizations = null,
      description_localizations = null;

    // If the command is not present on any locale, return null.
    if (!this.locales.some((locale) => locale.commands[commandName]))
      return { name_localizations, description_localizations };

    name_localizations = this._getCommandKeyValue(commandName, "name");
    description_localizations = this._getCommandKeyValue(
      commandName,
      "description"
    );

    return { name_localizations, description_localizations };
  }

  /**
   * Creates and returns a `LocalizationMap` belonging to a specific command's property name.
   */
  private _getCommandKeyValue = (
    commandName: string,
    key: keyof AresCommandTranslation
  ): LocalizationMap | null => {
    const baseValue = this._locales.get(Locale.EnglishUS)?.commands[
      commandName
    ][key];
    if (!baseValue) return null;

    return this._locales.map((locale) => {
      // If the command is currently being iterated, return it's previous value.
      if (AresLocalizationManager.isAresBaseLocale(locale.locale))
        return { [locale.locale]: baseValue };

      // If the command is not present on this locale, return null.
      const value = locale.commands[commandName][key];
      if (!value) {
        logger.warn(
          "[%s:%s] Command translation line found on base locale, yet it is not present on this one. [key=%s]",
          LoggerScopes.LocalizationManager,
          locale.locale,
          key
        );
        return { [locale.locale]: null };
      }

      // If the command is present on this locale, return its value.
      return { [locale.locale]: value };
    }) as LocalizationMap;
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
