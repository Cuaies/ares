import { Client, ClientOptions } from "discord.js";
import logger from "./modules/logger/logger";
import config from "config";
import { ClientConfig } from "./ts/interfaces/config.interface";
import { LoggerScopes } from "./util/loggerScopes";
const { token, options }: ClientConfig = config.get("clientConfig");

export class AresClient extends Client {
  constructor(opts: ClientOptions) {
    super(opts);
  }

  async init() {
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
