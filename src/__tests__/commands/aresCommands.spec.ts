import { ApplicationCommandType } from "discord.js";
import {
  AresChatInputCommand,
  AresChatInputCommandBuilder,
} from "../../modules/commands/aresChatInputCommand";
import { AresContextMenuCommandBuilder } from "../../modules/commands/aresContextMenuCommand";
import { AresMessageCommand } from "../../modules/commands/aresMessageCommand";
import { AresUserCommand } from "../../modules/commands/aresUserCommand";

describe("Commands", () => {
  describe("AresChatInputCommand", () => {
    const command = new AresChatInputCommand(
      new AresChatInputCommandBuilder().setName("test").setDescription("test"),
      async (i) => {
        return;
      }
    );
    test("it should be of the according type", () => {
      expect(command.data.type).toBe(ApplicationCommandType.ChatInput);
    });
  });

  describe("AresMessageCommand", () => {
    const command = new AresMessageCommand(
      new AresContextMenuCommandBuilder().setName("test"),
      async (i) => {
        return;
      }
    );
    test("it should be of the according type", () => {
      expect(command.data.type).toBe(ApplicationCommandType.Message);
    });
  });

  describe("AresUserCommand", () => {
    const command = new AresUserCommand(
      new AresContextMenuCommandBuilder().setName("test"),
      async (i) => {
        return;
      }
    );
    test("it should be of the according type", () => {
      expect(command.data.type).toBe(ApplicationCommandType.User);
    });
  });
});
