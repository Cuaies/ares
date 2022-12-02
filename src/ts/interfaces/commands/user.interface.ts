import { AresBaseCommand } from "./base.interface";
import { UserApplicationCommandData } from "discord.js";

export interface AresUserCommand
  extends AresBaseCommand,
    UserApplicationCommandData {}
