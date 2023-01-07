import { LocalizationMap } from "discord.js";
import { AresClient } from "../../lib/classes/aresClient";
import i18next from "i18next";
import I18NexFsBackend from "i18next-fs-backend";
import { createProviderOptions, DEFAULT_LOCALE } from "./i18next.config";
import AresLocalizationManagerError from "../logger/errors/localizationManagerError";
import logger from "../logger/logger";
import { LoggerScopes } from "../logger/loggerScopes";
import { isAresCommandLocale } from "../../util/helpers/typeUtil";
import { LocalizationNamespaces } from "./localizationNamespaces";
import { AresCommandTranslation } from "../../ts/types/types";
import { AresBaseManager } from "../../lib/classes/baseManager";
import LocalizationManagerResults from "./results";
import { ErrorCodes } from "../logger/errorCodes";

/**
 * Manager responsible for handling localization.
 */
export class AresLocalizationManager extends AresBaseManager {
  readonly scope = LoggerScopes.LocalizationManager;
  readonly results = new LocalizationManagerResults();

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
    throw new AresLocalizationManagerError(ErrorCodes.ProviderUninitialized);
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
            ns: LocalizationNamespaces.Commands,
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
              `[${this.scope}] Invalid command localization argument for command. [command=${commandName}] [locale=${locale}]`
            );
          }
        } else {
          logger.warn(
            `[${this.scope}] Missing command localization for command. [command=${commandName}] [locale=${locale}]`
          );
        }
      });
    } else {
      throw new AresLocalizationManagerError(
        ErrorCodes.ProviderRequiresPreloaded
      );
    }

    if (!default_localization.name) {
      throw new AresLocalizationManagerError(
        ErrorCodes.MissingCommandDefault,
        commandName
      );
    }

    return {
      default_localization,
      name_localizations,
      description_localizations,
    };
  }
}
