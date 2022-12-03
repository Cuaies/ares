import { LoggerScopes } from "../../util/loggerScopes";
import { BaseResults } from "../../lib/classes/baseResults";
import logger from "../logger/logger";
import { AresApplicationCommandType } from "../../ts/types/types";

export default class CommandManagerResults extends BaseResults<AresApplicationCommandType> {
  constructor() {
    super();
  }

  displayResults(): void {
    const result = this.success ? "ok" : "non-ok";

    logger.info(
      "[%s] Loaded %s commands [%s currently disabled] [%s]",
      LoggerScopes.CommandsManager,
      this._cached.length + this._disabled.length,
      this._disabled.length,
      result
    );

    logger.info(
      "[%s] Commands list: %s",
      LoggerScopes.CommandsManager,
      this._cached
        .concat(this._disabled)
        .map((command) => `${command.name}-${command.type}`)
    );

    if (!this.success) {
      logger.error(
        "[%s] Invalid commands list: %s",
        LoggerScopes.CommandsManager,
        this._uncached.map((command) => command.name)
      );
    }
  }
}
