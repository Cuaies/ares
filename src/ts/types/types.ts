import { Collection, Locale, Snowflake } from "discord.js";
import AresEventHandler from "../../modules/events/aresEventHandler";
import { AresChatInputCommandInterface } from "../interfaces/commands/chatInput.interface";
import { AresMessageCommandInterface } from "../interfaces/commands/message.interface";
import { AresUserCommandInterface } from "../interfaces/commands/user.interface";
import { AresLocaleInterface } from "../interfaces/localization/locale.interface";

export type EventCollection = Collection<Snowflake, AresEventHandler>;
export type AresApplicationCommandType =
  | AresChatInputCommandInterface
  | AresMessageCommandInterface
  | AresUserCommandInterface;
export type CommandCollection = Collection<
  Snowflake,
  AresApplicationCommandType
>;
export type LocaleCollection = Collection<Locale, AresLocaleInterface>;
export type CommandTranslation = {
  name: string;
  description: string;
};
