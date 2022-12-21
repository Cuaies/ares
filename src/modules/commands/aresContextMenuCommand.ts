import {
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
} from "discord.js";
import { Mixin } from "ts-mixer";
import { AresBaseCommand } from "./aresBaseCommand";

export class AresContextMenuCommandBuilder extends Mixin(
  AresBaseCommand,
  ContextMenuCommandBuilder
) {}

export class AresContextMenuCommand {
  /**
   * Command's data.
   */
  readonly data;
  /**
   * Command's execution function, meant to execute once interaction is received.
   */
  readonly execute;

  protected constructor(
    data: AresContextMenuCommandBuilder,
    execute: (interaction: ContextMenuCommandInteraction) => Promise<void>
  ) {
    this.data = data;
    this.execute = execute;
  }
}
