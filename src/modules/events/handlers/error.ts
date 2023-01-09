import { Events } from "discord.js";
import AresEventHandler from "../eventHandler";
import logger from "../../logger/logger";

export default new AresEventHandler(Events.Error, false, false, (error) => {
  logger.error(error);
});
