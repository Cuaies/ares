import { Collection, Locale, Snowflake } from "discord.js";
import { AresChatInputCommand } from "../../modules/commands/aresChatInputCommand";
import { AresMessageCommand } from "../../modules/commands/aresMessageCommand";
import { AresUserCommand } from "../../modules/commands/aresUserCommand";
import AresEventHandler from "../../modules/events/aresEventHandler";

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
export type AresLocale = {
  readonly locale: Locale;
  readonly commands: {
    readonly [key: string]: AresCommandTranslation;
  };
};
export type LocaleCollection = Collection<Locale, AresLocale>;
