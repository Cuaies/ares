import { AresClient } from "../../../client";
import logger from "../../logger/logger";
import config from "config";
import AresEventHandler from "../aresEventHandler";
import { Events } from "discord.js";

export default new AresEventHandler(
  Events.ClientReady,
  true,
  false,
  async (client: AresClient) => {
    logger.info(
      `Authenticated > %s • v%s`,
      client.user?.tag,
      process.env.npm_package_version
    );

    if (!(config.util.getEnv("NODE_ENV") === "production")) {
      client.user?.setStatus("dnd");
    }
  }
);
