import { BaseManager } from "discord.js";
import { AresClient } from "../../lib/classes/aresClient";
import i18next from "i18next";
import I18NexFsBackend from "i18next-fs-backend";
import { options } from "./i18next.config";
import AresLocalizationManagerError from "../../lib/classes/errors/shardingManagerError";

export class AresLocalizationManager extends BaseManager {
  /**
   * The translation provider, `i18next`.
   */
  private _provider!: typeof i18next;

  /**
   * Whether the provider is ready.
   */
  private _isProviderReady = false;

  constructor(client: AresClient) {
    super(client);
  }

  /**
   * Initializes the manager.
   */
  public async init() {
    await i18next.use(I18NexFsBackend).init(options);
    this._provider = i18next;
  }

  /**
   * The translation provider, `i18next`.
   */
  get provider() {
    this._isProviderReady || this.isProviderReady();
    return this._provider;
  }

  /**
   * Checks if the provider is ready to use.
   */
  private isProviderReady() {
    if (this._isProviderReady) return this._isProviderReady;
    if (this._provider && this._provider.isInitialized) {
      this._isProviderReady = true;
      return this._isProviderReady;
    }
    throw new AresLocalizationManagerError("Provider is not yet initialized");
  }
}
