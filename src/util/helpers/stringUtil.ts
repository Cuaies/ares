import { Events, Locale } from "discord.js";
import { AresChatInputCommand } from "../../modules/commands/aresChatInputCommand";
import { AresMessageCommand } from "../../modules/commands/aresMessageCommand";
import { AresUserCommand } from "../../modules/commands/aresUserCommand";
import { AresApplicationCommandType } from "../../ts/types/types";

export const isEventType = (str: string): str is keyof typeof Events => {
  return Object.values(Events).includes(str as Events);
};

export const isAresCommand = (
  command: unknown
): command is AresApplicationCommandType => {
  if (!command || command.constructor === Array) return false;
  if (command instanceof AresChatInputCommand) return true;
  if (command instanceof AresMessageCommand) return true;
  if (command instanceof AresUserCommand) return true;
  return false;
};

/**
 * Checks if the given string is a valid `Locale`.
 */
export const isLocale = (locale: unknown): locale is Locale => {
  if (!locale || locale.constructor === Array || typeof locale != "string")
    return false;
  return Object.values(Locale).includes(locale as Locale);
};
