import logger from "../../modules/logger/logger";
import { LoggerScopes } from "../../util/loggerScopes";

export abstract class BaseResults<T> {
  protected _scope: LoggerScopes;
  protected _cached: T[];
  protected _uncached: T[];
  protected _disabled: T[];

  constructor(scope: LoggerScopes) {
    this._scope = scope;
    this._cached = [];
    this._uncached = [];
    this._disabled = [];
  }

  get success() {
    if (this._uncached.length) {
      return false;
    }
    return true;
  }

  addCached(entry: T) {
    this._cached.push(entry);
  }

  addUncached(entry: T) {
    this._uncached.push(entry);
  }

  addDisabled(entry: T) {
    this._disabled.push(entry);
  }

  abstract displayResults(): void;

  noFiles(): void {
    logger.warn("[%s] No valid files found to load", this._scope);
  }

  duplicatedArg(arg?: unknown): void {
    logger.warn(
      "[%s] Argument is duplicated" + `${arg ? `: ${arg}` : ""}`,
      this._scope
    );
  }

  notOfType(arg?: unknown): void {
    logger.warn(
      "[%s] Argument is not of valid type" + `${arg ? `: ${arg}` : ""}`,
      this._scope
    );
  }
}
