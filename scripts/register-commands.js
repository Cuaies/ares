/* eslint-disable @typescript-eslint/no-var-requires */
require("../dist/startup/config");
const path = require("path");
const config = require("config");
const { AresClient } = require("../dist/lib/classes/aresClient");
const { REST, Routes } = require("discord.js");
const { token, clientId } = config.get("clientConfig");
const { guildId } = config.get("supportGuild");
const logger = require("../dist/modules/logger/logger").default;

const client = new AresClient({
  intents: [],
  partials: [],
});

// Path to the locales directory.
const LOCALES_PATH = path.join(
  __dirname,
  "../",
  "dist/modules/localization/locales"
);
// Path to the commands directory.
const COMMANDS_PATH = path.join(
  __dirname,
  "../",
  "dist/modules/commands/commands"
);

(async () => {
  const rest = new REST({ version: "10" }).setToken(token);
  const deployment = config.util.getEnv("NODE_ENV") == "production";

  await client.localizationManager.load(LOCALES_PATH);
  await client.commandManager.load(COMMANDS_PATH);

  let res,
    success = true;

  try {
    logger.info("Reloading application command(s) [production=%s]", deployment);
    // If the deployment is set to true, the deploy of the commands will be done to the global scope.
    if (deployment) {
      res = await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandManager.commands
          .filter((cmd) => !cmd.disabled)
          .map((cmd) => cmd.data.toJSON()),
      });
      // Otherwise, the deploy of the commands will be done to the support guild.
    } else {
      res = await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandManager.commands.map((cmd) => cmd.data.toJSON()),
      });
    }
  } catch (e) {
    success = false;
    logger.error(e);
  } finally {
    // Log the result of the deployment.
    logger.info(
      "Finished reloading %s application command(s) [%s]",
      res.length,
      success ? "ok" : "non-ok"
    );
  }
})();
