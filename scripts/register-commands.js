/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
const config = require("config");
const logger = require("../dist/modules/logger/logger").default;
const path = require("path");
const {
  AresCommandManager,
} = require("../dist/modules/commands/aresCommandManager");
const { token, clientId } = config.get("clientConfig");
const { guildId } = config.get("supportGuild");

/** Path to the commands' directory. */
const COMMANDS_PATH = path.join(__dirname, "../dist/modules/commands/commands");
const manager = new AresCommandManager();

(async () => {
  try {
    await manager.load(COMMANDS_PATH);
    await manager.putCommands({ token, clientId, guildId });
  } catch (e) {
    logger.error(e);
  }
})();
