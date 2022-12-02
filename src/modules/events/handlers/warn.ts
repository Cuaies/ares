import { Events } from "discord.js";
import AresEventHandler from "../aresEventHandler";
import logger from "../../logger/logger";

export default new AresEventHandler(
  Events.Warn,
  false,
  false,
  (info: string) => {
    logger.warn("info", info);
  }
);
