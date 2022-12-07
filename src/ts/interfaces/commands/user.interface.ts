import { AresBaseCommandInterface } from "./base.interface";
import { UserApplicationCommandData } from "discord.js";

export interface AresUserCommandInterface
  extends AresBaseCommandInterface,
    UserApplicationCommandData {}
