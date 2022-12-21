import logger from "./modules/logger/logger";
import config from "config";
import { ClientConfig } from "./ts/interfaces/config.interface";
import { AresClient } from "./lib/classes/aresClient";
const { token, options }: ClientConfig = config.get("clientConfig");

const client = new AresClient({
  partials: options.partials,
  intents: options.intents,
});

(async () => {
  await client.init(token).catch((e) => logger.error(e));
})();
