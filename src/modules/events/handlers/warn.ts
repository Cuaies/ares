import { Events } from "discord.js";
import AresEventHandler from "../eventHandler";
import logger from "../../logger/logger";

export default new AresEventHandler(Events.Warn, false, false, (info) => {
  logger.warn("info", info);
});
