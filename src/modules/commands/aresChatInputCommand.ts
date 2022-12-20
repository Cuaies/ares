import {
  ApplicationCommandType,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { Mixin } from "ts-mixer";
import { AresBaseCommand } from "./aresBaseCommand";

export class AresChatInputCommandBuilder extends Mixin(
  AresBaseCommand,
  SlashCommandBuilder
) {
  readonly type = ApplicationCommandType.ChatInput;
}

export class AresChatInputCommand {
  /**
   * Command's data.
   */
  readonly data;
  /**
   * Command's execution function, meant to execute once interaction is received.
   */
  readonly execute;

  constructor(
    data: AresChatInputCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>
  ) {
    this.data = data;
    this._validate();
    this.execute = execute;
  }

  private _validate() {
    return this.data.toJSON();
  }
}
