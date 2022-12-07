import { Collection, Snowflake } from "discord.js";
import AresEventHandler from "../../modules/events/aresEventHandler";
import { AresChatInputCommandInterface } from "../interfaces/commands/chatInput.interface";
import { AresMessageCommandInterface } from "../interfaces/commands/message.interface";
import { AresUserCommandInterface } from "../interfaces/commands/user.interface";

export type EventCollection = Collection<Snowflake, AresEventHandler>;
export type AresApplicationCommandType =
  | AresChatInputCommandInterface
  | AresMessageCommandInterface
  | AresUserCommandInterface;
export type CommandCollection = Collection<
  Snowflake,
  AresApplicationCommandType
>;
