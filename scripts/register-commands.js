/* eslint-disable @typescript-eslint/no-var-requires */
require("../dist/startup/config");
const path = require("path");
const config = require("config");
const { AresClient } = require("../dist/lib/classes/aresClient");
const { REST, Routes } = require("discord.js");
const { isProductionEnvironment } = require("../dist/util/helpers/configUtil");
const { token, clientId } = config.get("clientConfig");
const { guildId } = config.get("supportGuild");
const logger = require("../dist/modules/logger/logger").default;

const client = new AresClient({
  intents: [],
  partials: [],
});

// Path to the commands directory.
const COMMANDS_PATH = path.join(
  __dirname,
  "../",
  "dist/modules/commands/commands"
);

(async () => {
  await client.localizationManager.init();
  await client.commandManager.load(COMMANDS_PATH);

  const production = isProductionEnvironment();
  const rest = new REST({ version: "10" }).setToken(token);

  const route = production
    ? Routes.applicationCommands(clientId)
    : Routes.applicationGuildCommands(clientId, guildId);

  const requestData = production
    ? {
        body: client.commandManager.commands
          .filter((cmd) => !cmd.data.disabled)
          .map((cmd) => cmd.data.toJSON()),
      }
    : {
        body: client.commandManager.commands.map((cmd) => cmd.data.toJSON()),
      };

  let res,
    success = false;

  try {
    logger.info("Reloading application command(s) [production=%s]", production);
    res = await rest.put(route, requestData);
    success = true;
  } catch (e) {
    logger.error(e);
  } finally {
    logger.info(
      "Finished reloading %s application command(s) [%s]",
      res.length,
      success ? "ok" : "non-ok"
    );
  }
})().catch((e) => logger.error(e));
