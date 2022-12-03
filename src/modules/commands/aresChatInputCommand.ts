import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { AresChatInputCommandInterface } from "../../ts/interfaces/commands/chatInput.interface";
import { CommandCategories } from "../../util/commandCategories";
import { AresBaseCommand } from "./aresBaseCommand";

export class AresChatInputCommand
  extends AresBaseCommand
  implements AresChatInputCommandInterface
{
  type: ApplicationCommandType.ChatInput;
  description;

  constructor(
    name: string,
    description: string,
    category: CommandCategories,
    isDisabled: boolean,
    execute: (interaction: CommandInteraction) => Promise<void>
  ) {
    super(name, category, isDisabled, execute);
    this.type = ApplicationCommandType.ChatInput;
    this.description = description;
  }
}
