import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { AresUserCommandInterface } from "../../ts/interfaces/commands/user.interface";
import { CommandCategories } from "../../util/commandCategories";
import { AresBaseCommand } from "./aresBaseCommand";

export class AresUserCommand
  extends AresBaseCommand
  implements AresUserCommandInterface
{
  type: ApplicationCommandType.User;

  constructor(
    name: string,
    category: CommandCategories,
    isDisabled: boolean,
    execute: (interaction: CommandInteraction) => Promise<void>
  ) {
    super(name, category, isDisabled, execute);
    this.type = ApplicationCommandType.User;
  }
}
