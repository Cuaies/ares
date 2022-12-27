import { BaseManager } from "discord.js";
import { AresClient } from "../../lib/classes/aresClient";
import i18next from "i18next";
import I18NexFsBackend from "i18next-fs-backend";
import { options } from "./i18next.config";

export class AresLocalizationManager extends BaseManager {
  private _provider!: typeof i18next;

  constructor(client: AresClient) {
    super(client);
  }

  public async init() {
    await i18next.use(I18NexFsBackend).init(options);
    this._provider = i18next;
  }

  get provider() {
    return this._provider;
  }
}
