import { CommandCategories } from "../../../util/commandCategories";
import {
  CommandInteraction,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction,
} from "discord.js";
export interface AresBaseCommand {
  name: string;
  category: CommandCategories;
  disabled: boolean;
  execute: (
    interaction:
      | CommandInteraction
      | UserContextMenuCommandInteraction
      | MessageContextMenuCommandInteraction
  ) => Promise<void>;
}
