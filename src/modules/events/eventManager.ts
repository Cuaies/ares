import { ClientEvents, Collection } from "discord.js";
import { readdir } from "fs/promises";
import path from "path";
import { AresClient } from "../../lib/classes/aresClient";
import { EventCollection } from "../../ts/types/types";
import { isEventType } from "../../util/helpers/stringUtil";
import { LoggerScopes } from "../logger/loggerScopes";
import logger from "../logger/logger";
import AresEventHandler from "./eventHandler";
import EventManagerResults from "./results";
import { AresBaseManager } from "../../lib/classes/baseManager";

/**
 * Path to the event handlers directory.
 */
const HANDLERS_PATH = path.join(__dirname, "handlers");

export class AresEventManager extends AresBaseManager {
  readonly scope = LoggerScopes.EventsHandler;
  readonly results = new EventManagerResults();

  /**
   * Collection of cached event handlers.
   */
  private _eventHandlers: EventCollection = new Collection();

  constructor(client: AresClient) {
    super(client);
  }

  /**
   * Initializes the manager.
   */
  public async init() {
    await this.loadEventHandlers(HANDLERS_PATH);
    this.results.displayResults();
    await this.registerEventHandlers();
  }

  /**
   * Get the collection of cached event handlers.
   */
  get handlers() {
    return this._eventHandlers;
  }

  /**
   * Cache handler modules from local directory.
   */
  public async loadEventHandlers(directory: string): Promise<void> {
    const handlerFiles = await readdir(directory, { withFileTypes: false });

    if (!handlerFiles || !handlerFiles.length) {
      this.results.displayResults();
      return;
    }

    await handlerFiles.reduce(async (p, file) => {
      await p;
      const pathToEvent = path.join(directory, file);
      const handler: AresEventHandler = (await import(pathToEvent)).default;
      logger.debug(LoggerScopes.EventsHandler, {
        iterating: handler.name,
        path: pathToEvent,
      });

      if (isEventType(handler.name)) {
        if (this._eventHandlers.has(handler.name)) {
          this.results.addUncached(handler);
          logger.warn(
            "[%s] Duplicated event handler found: %s",
            LoggerScopes.EventsHandler,
            handler.name
          );
          return;
        }

        handler.disabled
          ? this.results.addDisabled(handler)
          : this.results.addCached(handler);
        this._eventHandlers.set(handler.name, handler);
      } else {
        logger.warn(
          "[%s] Handler name does not match allowed values: %s",
          LoggerScopes.EventsHandler,
          handler.name
        );
        this.results.addUncached(handler);
      }
    }, Promise.resolve());
  }

  /**
   * Registers cached handlers.
   */
  public async registerEventHandlers(): Promise<void> {
    if (!this.client) return;
    this._eventHandlers.forEach((handler) => {
      if (handler.disabled) return;

      logger.info(
        "[%s] Listening for event: %s",
        LoggerScopes.EventsHandler,
        handler.name
      );

      try {
        handler.once
          ? this.client?.once(handler.name as keyof ClientEvents, (...props) =>
              handler.execute(...props)
            )
          : this.client?.on(handler.name as keyof ClientEvents, (...props) =>
              handler.execute(...props)
            );
      } catch (e) {
        logger.error(e);
      }
    });
  }
}
