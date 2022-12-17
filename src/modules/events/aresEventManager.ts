import { ClientEvents, Collection } from "discord.js";
import { readdir } from "fs/promises";
import path from "path";
import { AresClient } from "../../lib/classes/aresClient";
import { EventCollection } from "../../ts/types/types";
import { isEventType } from "../../util/helpers/stringUtil";
import { LoggerScopes } from "../logger/loggerScopes";
import logger from "../logger/logger";
import AresEventHandler from "./aresEventHandler";
import EventManagerResults from "./results";

export class AresEventManager {
  client?: AresClient;
  private _eventHandlers: EventCollection;

  constructor(client?: AresClient) {
    this.client = client;
    this._eventHandlers = new Collection();
  }

  get handlers() {
    return this._eventHandlers;
  }

  /**
   * Cache handler modules from local directory.
   */
  public async loadEventHandlers(directory: string): Promise<void> {
    logger.verbose("[%s] Loading events", LoggerScopes.EventsHandler);

    const handlerFiles = await readdir(directory, { withFileTypes: false });
    const results = new EventManagerResults();

    if (!handlerFiles || !handlerFiles.length) return results.displayResults();

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
          results.addUncached(handler);
          logger.warn(
            "[%s] Duplicated event handler found: %s",
            LoggerScopes.EventsHandler,
            handler.name
          );
          return;
        }

        handler.disabled
          ? results.addDisabled(handler)
          : results.addCached(handler);
        this._eventHandlers.set(handler.name, handler);
      } else {
        logger.warn(
          "[%s] Handler name does not match allowed values: %s",
          LoggerScopes.EventsHandler,
          handler.name
        );
        results.addUncached(handler);
      }
    }, Promise.resolve());

    results.displayResults();
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

  /**
   * Loads & registers every valid handler from the provided directory.
   * @param directory Path to the handlers' directory.
   */
  public async loadAll(directory: string): Promise<void> {
    await this.loadEventHandlers(directory);
    this.registerEventHandlers();
  }
}
