import { BaseManager, Collection, LocalizationMap } from "discord.js";
import { readdir } from "fs/promises";
import path from "path";
import { AresClient } from "../../lib/classes/aresClient";
import { AresLocaleInterface } from "../../ts/interfaces/localization/locale.interface";
import { LocaleCollection } from "../../ts/types/types";
import { LoggerScopes } from "../../util/loggerScopes";
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
      const locale: AresLocaleInterface = (await import(pathToLocale)).default;

      if (AresLocalizationManager.isLocale(locale)) {
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
   * Create a `LocalizationMap` for a command.
   */
  public createLocalizationMap(commandName: string): LocalizationMap {
    // TODO: implement
  }

  /**
   * Type guard for checking if argument is of `AresLocaleInterface`.
   */
  static isLocale(locale: unknown): locale is AresLocaleInterface {
    if (!locale || locale.constructor === Array) return false;
    const keys = Object.keys(locale);
    if (keys.includes("locale") && keys.includes("commands")) return true;
    return false;
  }
}
