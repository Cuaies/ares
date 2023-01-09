import { BaseManager } from "discord.js";
import { LoggerScopes } from "../../modules/logger/loggerScopes";
import { AresClient } from "./aresClient";
import { BaseResults } from "./baseResults";

/**
 * Base manager for Ares.
 */
export abstract class AresBaseManager extends BaseManager {
  /**
   * The logger scope for the manager.
   */
  abstract readonly scope: LoggerScopes;

  /**
   * Manager's results class.
   */
  abstract readonly results: InstanceType<typeof BaseResults>;

  constructor(client: AresClient) {
    super(client);
  }
}
