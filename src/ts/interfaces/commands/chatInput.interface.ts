import { AresBaseCommandInterface } from "./base.interface";
import {
  ApplicationCommandType,
  ChatInputApplicationCommandData,
} from "discord.js";

export interface AresChatInputCommandInterface
  extends AresBaseCommandInterface,
    ChatInputApplicationCommandData {
  type: ApplicationCommandType.ChatInput;
}
