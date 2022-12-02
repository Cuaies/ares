import { Events } from "discord.js";
import AresEventHandler from "../aresEventHandler";
import logger from "../../logger/logger";
import { LoggerScopes } from "../../../util/loggerScopes";

export default new AresEventHandler(Events.Debug, false, true, (info) => {
  logger.debug(LoggerScopes.EventsHandler, { debug: info });
});
