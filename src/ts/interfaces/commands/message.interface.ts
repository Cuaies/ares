import { AresBaseCommand } from "./base.interface";
import { MessageApplicationCommandData } from "discord.js";

export interface AresMessageCommand
  extends AresBaseCommand,
    MessageApplicationCommandData {}
