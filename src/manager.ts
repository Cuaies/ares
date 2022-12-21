import { ShardingManager } from "discord.js";
import path from "path";
import config from "config";
import logger from "./modules/logger/logger";
import { ClientConfig } from "./ts/interfaces/config.interface";
import { LoggerScopes } from "./modules/logger/loggerScopes";
const { token }: ClientConfig = config.get("clientConfig");

const manager = new ShardingManager(path.join(__dirname, "./client.js"), {
  totalShards: "auto",
  token,
});

manager.on("shardCreate", (shard) => {
  const loggerScope = `[${LoggerScopes.ShardingManager}:${shard.id}]`;
  logger.verbose(`%s is launching`, loggerScope);

  shard.on("ready", () => {
    logger.info(`%s is ready`, loggerScope);
  });
  shard.on("death", () => {
    logger.info(`%s has died`, loggerScope);
  });
  shard.on("reconnecting", () => {
    logger.info(`%s is reconnecting`, loggerScope);
  });
});

manager.spawn().catch((e) => logger.error(e));
