import { Collection, Snowflake } from "discord.js";
import AresEventHandler from "../../modules/events/aresEventHandler";

export type EventCollection = Collection<Snowflake, AresEventHandler>;
