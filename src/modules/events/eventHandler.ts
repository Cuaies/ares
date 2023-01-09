import { ClientEvents } from "discord.js";

export default class AresEventHandler<
  E extends keyof ClientEvents = keyof ClientEvents
> {
  /**
   * The name of the handler.
   */
  readonly name: E;

  /**
   * Wether the handler will execute once or not.
   */
  readonly once: boolean;

  /**
   * Wether to run in production or not.
   */
  readonly disabled: boolean;

  /**
   * The function to execute.
   */
  readonly execute: (...args: ClientEvents[E]) => Promise<void> | void;

  constructor(
    name: E,
    isOnce: boolean,
    isDisabled: boolean,
    execute: (...args: ClientEvents[E]) => Promise<void> | void
  ) {
    this.name = name;
    this.once = isOnce;
    this.disabled = isDisabled;
    this.execute = execute;
  }
}
