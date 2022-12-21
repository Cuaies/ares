import { GatewayIntentBits, Partials } from "discord.js";

export interface Config {
  /** Client's configuration */
  clientConfig: ClientConfig;
  supportGuild: SupportGuild;
}

export interface ClientConfig {
  /** Client's Token */
  token: string;

  /** Client's User ID */
  clientId: string;

  /** Options */
  options: {
    /** Partials */
    partials: Partials[];

    /** Intents */
    intents: GatewayIntentBits[];
  };
}

export interface SupportGuild {
  /** Support server's ID */
  guildId: string;
}
