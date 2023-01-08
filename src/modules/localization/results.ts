import { Locale } from "discord.js";
import { BaseResults } from "../../lib/classes/baseResults";
import { LoggerScopes } from "../logger/loggerScopes";
import logger from "../logger/logger";
import { getAvailableLocales } from "./i18next.config";

export default class LocalizationManagerResults extends BaseResults<Locale> {
  constructor() {
    super(LoggerScopes.LocalizationManager);
  }

  /**
   * Checks if there are any leftover locales.
   */
  public async checkForUncached(pathToLocales: string): Promise<void> {
    const availableLocales = await getAvailableLocales(pathToLocales);
    const uncachedLocales = availableLocales.filter(
      (locale) => !this._cached.includes(<Locale>locale)
    );

    if (uncachedLocales.length) this.setUncached(<Locale[]>uncachedLocales);
  }

  public displayResults(): void {
    const result = this.success ? "ok" : "non-ok";

    logger.info(
      "[%s] Loaded %s locales [%s]",
      this._scope,
      this._cached.length,
      result
    );

    logger.info(
      "[%s] Locales list: %s",
      this._scope,
      this._cached.map((locale) => locale)
    );

    if (!this.success) {
      logger.error(
        "[%s] Invalid locales list: %s",
        this._scope,
        this._uncached.map((locale) => locale)
      );
    }
  }
}
