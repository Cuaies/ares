// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Partials, GatewayIntentBits } = require("discord.js");

module.exports = {
  clientConfig: {
    token: null,
    options: {
      partials: [Partials.User],
      intents: [GatewayIntentBits.Guilds],
    },
  },
};
