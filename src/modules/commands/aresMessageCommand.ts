import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { AresMessageCommandInterface } from "../../ts/interfaces/commands/message.interface";
import { CommandCategories } from "../../util/commandCategories";
import { AresBaseCommand } from "./aresBaseCommand";

export class AresMessageCommand
  extends AresBaseCommand
  implements AresMessageCommandInterface
{
  type: ApplicationCommandType.Message;

  constructor(
    name: string,
    category: CommandCategories,
    isDisabled: boolean,
    execute: (interaction: CommandInteraction) => Promise<void>
  ) {
    super(name, category, isDisabled, execute);
    this.type = ApplicationCommandType.Message;
  }
}
