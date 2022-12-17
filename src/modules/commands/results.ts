import { LoggerScopes } from "../logger/loggerScopes";
import { BaseResults } from "../../lib/classes/baseResults";
import logger from "../logger/logger";
import { AresApplicationCommandType } from "../../ts/types/types";

export default class CommandManagerResults extends BaseResults<AresApplicationCommandType> {
  constructor() {
    super(LoggerScopes.CommandsManager);
  }

  displayResults(): void {
    const result = this.success ? "ok" : "non-ok";

    logger.info(
      "[%s] Loaded %s commands [%s currently disabled] [%s]",
      this._scope,
      this._cached.length + this._disabled.length,
      this._disabled.length,
      result
    );

    logger.info(
      "[%s] Commands list: %s",
      this._scope,
      this._cached
        .concat(this._disabled)
        .map(
          (command) =>
            `${command.disabled ? "#" : ""}${command.name}-${command.type}`
        )
    );

    if (!this.success) {
      logger.error(
        "[%s] Invalid commands list: %s",
        this._scope,
        this._uncached.map((command) => command.name)
      );
    }
  }
}
