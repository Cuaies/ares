import logger from "../../logger/logger";
import config from "config";
import AresEventHandler from "../eventHandler";
import { Events } from "discord.js";

export default new AresEventHandler(
  Events.ClientReady,
  true,
  false,
  async (client) => {
    logger.info(`Authenticated > %s`, client.user?.tag);

    if (!(config.util.getEnv("NODE_ENV") === "production")) {
      client.user?.setStatus("dnd");
    }
  }
);
