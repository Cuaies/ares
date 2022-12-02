import { Client, ClientOptions } from "discord.js";
import logger from "./modules/logger/logger";
import config from "config";
import { ClientConfig } from "./ts/interfaces/config.interface";
import { AresEventManager } from "./modules/events/aresEventManager";
import path from "path";
import { LoggerScopes } from "./util/loggerScopes";
const { token, options }: ClientConfig = config.get("clientConfig");

/**
 * Path to the event handlers' directory.
 */
const EVENTS_PATH = path.join(__dirname, "modules/events/handlers");
export class AresClient extends Client {
  public eventManager: AresEventManager;

  constructor(opts: ClientOptions) {
    super(opts);

    this.eventManager = new AresEventManager(this);
  }

  async init() {
    this.eventManager.loadAll(EVENTS_PATH);

    logger.verbose(
      "[%s:%s] Client attempting to login",
      LoggerScopes.ShardingManager,
      this.shard?.ids.toString()
    );
    this.login(token);
  }
}

const client = new AresClient({
  partials: options.partials,
  intents: options.intents,
});

(async () => {
  await client.init().catch((e) => logger.error(new Error(e)));
})();
