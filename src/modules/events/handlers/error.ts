import { Events } from "discord.js";
import AresEventHandler from "../aresEventHandler";
import logger from "../../logger/logger";

export default new AresEventHandler(
  Events.Error,
  false,
  false,
  (error: Error) => {
    logger.error(error);
  }
);
