import { GatewayIntentBits, Partials } from "discord.js";

export interface Config {
  /** Client's configuration */
  clientConfig: ClientConfig;
}

export interface ClientConfig {
  /** Client's Token */
  token: string;

  /** Options */
  options: {
    /** Partials */
    partials: Partials[];

    /** Intents */
    intents: GatewayIntentBits[];
  };
}
