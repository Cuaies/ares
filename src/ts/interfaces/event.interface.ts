import { Events } from "discord.js";

export interface ClientEventHandler {
  name: Events;
  once: boolean;
  disabled: boolean;
  execute: (...args: any[]) => Promise<void> | void; // TODO: types
}
