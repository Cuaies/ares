import { Events } from "discord.js";
import { AresChatInputCommand } from "../../modules/commands/aresChatInputCommand";
import { AresApplicationCommandType } from "../../ts/types/types";

export const isEventType = (str: string): str is keyof typeof Events => {
  return Object.values(Events).includes(str as Events);
};

export const isAresCommand = (
  command: unknown
): command is AresApplicationCommandType => {
  if (!command || command.constructor === Array) return false;
  if (command instanceof AresChatInputCommand) return true;
  if (command instanceof AresChatInputCommand) return true;
  if (command instanceof AresChatInputCommand) return true;
  return false;
};
