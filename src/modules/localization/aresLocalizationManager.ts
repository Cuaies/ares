import { BaseManager, LocalizationMap } from "discord.js";
import { AresClient } from "../../lib/classes/aresClient";
import i18next from "i18next";
import I18NexFsBackend from "i18next-fs-backend";
import { createProviderOptions, DEFAULT_LOCALE } from "./i18next.config";
import AresLocalizationManagerError from "../../lib/classes/errors/shardingManagerError";
import logger from "../logger/logger";
import { LoggerScopes } from "../logger/loggerScopes";
import { isAresCommandLocale } from "../../util/helpers/typeUtil";
import { LocaleNamespaces } from "./localizationNamespaces";
import { AresCommandTranslation } from "../../ts/types/types";

/**
 * Manager responsible for handling localization.
 */
export class AresLocalizationManager extends BaseManager {
  /**
   * The translation provider, `i18next`.
   */
  private _provider!: typeof i18next;

  /**
   * Whether the provider is ready.
   */
  private _providerReady = false;

  constructor(client: AresClient) {
    super(client);
  }

  /**
   * Initializes the manager.
   */
  public async init() {
    await i18next.use(I18NexFsBackend).init(await createProviderOptions());
    if (i18next.isInitialized) this._providerReady = true;
    this._provider = i18next;
  }

  /**
   * The translation provider, `i18next`.
   */
  get provider() {
    this._providerReady || this._isProviderReady();
    return this._provider;
  }

  /**
   * Checks if the provider is ready to use.
   */
  private _isProviderReady() {
    if (this._providerReady) return this._providerReady;
    if (this._provider && this._provider.isInitialized) {
      this._providerReady = true;
      return this._providerReady;
    }
    throw new AresLocalizationManagerError("Provider is not yet initialized");
  }

  /**
   * Creates localization maps for the supplied command name.
   */
  public createCommandLocalizationMaps(commandName: string): {
    default_localization: AresCommandTranslation;
    name_localizations: LocalizationMap;
    description_localizations: LocalizationMap;
  } {
    const { provider } = this,
      name_localizations: LocalizationMap = {},
      description_localizations: LocalizationMap = {},
      default_localization = {} as AresCommandTranslation;

    if (
      this.provider.options.preload &&
      Array.isArray(this.provider.options.preload)
    ) {
      this.provider.options.preload.forEach((locale) => {
        if (provider.exists(commandName, { lng: locale, ns: "commands" })) {
          const t = provider.t(commandName, {
            lng: locale,
            ns: LocaleNamespaces.Commands,
            returnObjects: true,
          });

          if (isAresCommandLocale(t)) {
            if (locale == DEFAULT_LOCALE) {
              return Object.assign(default_localization, t);
            }

            Object.assign(name_localizations, { [locale]: t.name });
            Object.assign(description_localizations, {
              [locale]: t.description || null,
            });
          } else {
            logger.warn(
              `[${LoggerScopes.LocalizationManager}] Invalid command localization argument for command. [command=${commandName}] [locale=${locale}]`
            );
          }
        } else {
          logger.warn(
            `[${LoggerScopes.LocalizationManager}] Missing command localization for command. [command=${commandName}] [locale=${locale}]`
          );
        }
      });
    } else {
      throw new AresLocalizationManagerError(
        "Provider requires preloaded locales in order to create command localization maps."
      );
    }

    if (!default_localization.name) {
      throw new AresLocalizationManagerError(
        `Missing default command localization for command. [command=${commandName}]`
      );
    }

    return {
      default_localization,
      name_localizations,
      description_localizations,
    };
  }
}
