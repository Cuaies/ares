import { ApplicationCommandType, SharedNameAndDescription } from "discord.js";
import { CommandCategories } from "../../util/commandCategories";

export class AresBaseCommand extends SharedNameAndDescription {
  /**
   * Application command type.
   */
  readonly type: ApplicationCommandType = undefined!;

  /**
   * The category of the command.
   */
  readonly category: CommandCategories = undefined!;

  /**
   * The readiness status of the command, which dictates whether the command should be pushed to production or not.
   */
  readonly disabled: boolean = false;

  /**
   * Sets the category of the command.
   */
  public setCategory(category: CommandCategories) {
    Reflect.set(this, "category", category);
    return this;
  }

  /**
   * Sets the disabled status of the command.
   */
  public setDisabled(disabled: boolean) {
    Reflect.set(this, "disabled", disabled);
    return this;
  }
}
