import { Client, ClientOptions } from "discord.js";
import path from "path";
import { AresCommandManager } from "../../modules/commands/aresCommandManager";
import { AresEventManager } from "../../modules/events/aresEventManager";
import { AresLocalizationManager } from "../../modules/localization/localizationManager";
import logger from "../../modules/logger/logger";
import { LoggerScopes } from "../../modules/logger/loggerScopes";

/** Path to the event handlers' directory. */
const EVENTS_PATH = path.join(__dirname, "../../", "modules/events/handlers");
/** Path to the commands' directory. */
const COMMANDS_PATH = path.join(
  __dirname,
  "../../",
  "modules/commands/commands"
);

export class AresClient extends Client {
  public eventManager;
  public commandManager;
  public localizationManager;

  constructor(opts: ClientOptions) {
    super(opts);

    this.localizationManager = new AresLocalizationManager(this);
    this.eventManager = new AresEventManager(this);
    this.commandManager = new AresCommandManager(this);
  }

  async loadManagers(commandsPath = COMMANDS_PATH, eventsPath = EVENTS_PATH) {
    await this.localizationManager.init();
    await this.commandManager.load(commandsPath);
    this.eventManager.loadAll(eventsPath);
  }

  async init(token: string) {
    await this.loadManagers();

    logger.verbose(
      "[%s:%s] Client attempting to login",
      LoggerScopes.ShardingManager,
      this.shard?.ids.toString()
    );
    this.login(token);
  }
}
