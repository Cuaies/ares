export abstract class BaseResults<T> {
  protected _cached: T[];
  protected _uncached: T[];
  protected _disabled: T[];

  constructor() {
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
}
