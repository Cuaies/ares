import { Locale } from "discord.js";
import { CommandTranslation } from "../../types/types";

export interface AresLocaleInterface {
  readonly locale: Locale;
  readonly commands: {
    readonly [key: string]: CommandTranslation;
  };
}
