import logger from "../../modules/logger/logger";
import { LoggerScopes } from "../../modules/logger/loggerScopes";

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
    return this;
  }

  setCached(entries: T[]) {
    this._cached = entries;
    return this;
  }

  addUncached(entry: T) {
    this._uncached.push(entry);
    return this;
  }

  setUncached(entries: T[]) {
    this._uncached = entries;
    return this;
  }

  addDisabled(entry: T) {
    this._disabled.push(entry);
    return this;
  }

  setDisabled(entries: T[]) {
    this._disabled = entries;
    return this;
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
