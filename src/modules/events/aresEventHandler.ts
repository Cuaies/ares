import { Events } from "discord.js";
import { ClientEventHandler } from "../../ts/interfaces/event.interface";

export default class AresEventHandler implements ClientEventHandler {
  readonly name;
  readonly once;
  readonly disabled;
  readonly execute;

  constructor(
    name: Events,
    isOnce: boolean,
    isDisabled: boolean,
    execute: (...args: any[]) => Promise<void> | void // TODO: types
  ) {
    this.name = name;
    this.once = isOnce;
    this.disabled = isDisabled;
    this.execute = execute;
  }
}
