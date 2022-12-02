import { Events } from "discord.js";

export const isEventType = (str: string): str is keyof typeof Events => {
  return Object.values(Events).includes(str as Events);
};
