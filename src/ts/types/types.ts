import { Collection, Snowflake } from "discord.js";
import { AresChatInputCommand } from "../../modules/commands/aresChatInputCommand";
import { AresMessageCommand } from "../../modules/commands/aresMessageCommand";
import { AresUserCommand } from "../../modules/commands/aresUserCommand";
import AresEventHandler from "../../modules/events/eventHandler";

export type EventCollection = Collection<Snowflake, AresEventHandler>;
export type AresApplicationCommandType =
  | AresChatInputCommand
  | AresUserCommand
  | AresMessageCommand;
export type CommandCollection = Collection<
  Snowflake,
  AresApplicationCommandType
>;
export type AresCommandTranslation = {
  name: string;
  description?: string;
};
