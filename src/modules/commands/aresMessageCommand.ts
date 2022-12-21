import {
  ApplicationCommandType,
  ContextMenuCommandInteraction,
} from "discord.js";
import {
  AresContextMenuCommand,
  AresContextMenuCommandBuilder,
} from "./aresContextMenuCommand";

export class AresMessageCommand extends AresContextMenuCommand {
  constructor(
    data: AresContextMenuCommandBuilder,
    execute: (interaction: ContextMenuCommandInteraction) => Promise<void>
  ) {
    super(data, execute);
    this.data.setType(ApplicationCommandType.Message);
  }
}
