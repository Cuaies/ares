import {
  CommandInteraction,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction,
} from "discord.js";
import { AresBaseCommandInterface } from "../../ts/interfaces/commands/base.interface";
import { CommandCategories } from "../../util/commandCategories";

export class AresBaseCommand implements AresBaseCommandInterface {
  name;
  category;
  disabled;
  execute;

  constructor(
    name: string,
    category: CommandCategories,
    isDisabled: boolean,
    execute: (
      interaction:
        | CommandInteraction
        | UserContextMenuCommandInteraction
        | MessageContextMenuCommandInteraction
    ) => Promise<void>
  ) {
    this.name = name;
    this.category = category;
    this.disabled = isDisabled;
    this.execute = execute;
  }
}
