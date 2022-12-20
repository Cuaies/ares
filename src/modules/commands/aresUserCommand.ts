import {
  ApplicationCommandType,
  ContextMenuCommandInteraction,
} from "discord.js";
import {
  AresContextMenuCommand,
  AresContextMenuCommandBuilder,
} from "./aresContextMenuCommand";

export class AresUserCommand extends AresContextMenuCommand {
  constructor(
    data: AresContextMenuCommandBuilder,
    execute: (interaction: ContextMenuCommandInteraction) => Promise<void>
  ) {
    super(data, execute);
    this.data.setType(ApplicationCommandType.User);
    this._validate();
  }

  private _validate() {
    return this.data.toJSON();
  }
}
