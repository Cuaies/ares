import { AresBaseCommandInterface } from "./base.interface";
import { MessageApplicationCommandData } from "discord.js";

export interface AresMessageCommandInterface
  extends AresBaseCommandInterface,
    MessageApplicationCommandData {}
