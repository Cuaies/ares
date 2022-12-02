import { LoggerScopes } from "../../util/loggerScopes";
import { BaseResults } from "../../lib/classes/baseResults";
import logger from "../logger/logger";
import AresEventHandler from "./aresEventHandler";

export default class EventManagerResults extends BaseResults<AresEventHandler> {
  constructor() {
    super();
  }

  displayResults() {
    const result = this.success ? "ok" : "non-ok";

    logger.info(
      "[%s] Loaded %s handlers [%s currently disabled] [%s]",
      LoggerScopes.EventsHandler,
      this._cached.length + this._disabled.length,
      this._disabled.length,
      result
    );

    if (!this.success) {
      logger.error(
        "[%s] Invalid handlers list: %s",
        LoggerScopes.EventsHandler,
        this._uncached.map((event) => event.name)
      );
    }
  }
}
