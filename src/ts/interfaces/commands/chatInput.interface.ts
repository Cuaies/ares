import { AresBaseCommand } from "./base.interface";
import {
  ApplicationCommandType,
  ChatInputApplicationCommandData,
} from "discord.js";

export interface AresChatInputCommand
  extends AresBaseCommand,
    ChatInputApplicationCommandData {
  type: ApplicationCommandType.ChatInput;
}
