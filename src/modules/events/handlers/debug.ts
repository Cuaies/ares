import { Events } from "discord.js";
import AresEventHandler from "../aresEventHandler";
import logger from "../../logger/logger";
import { LoggerScopes } from "../../logger/loggerScopes";

export default new AresEventHandler(Events.Debug, false, false, (info) => {
  logger.debug(LoggerScopes.EventsHandler, { debug: info });
});
