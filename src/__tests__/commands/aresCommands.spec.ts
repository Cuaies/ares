import { ApplicationCommandType } from "discord.js";
import { AresChatInputCommand } from "../../modules/commands/aresChatInputCommand";
import { AresMessageCommand } from "../../modules/commands/aresMessageCommand";
import { AresUserCommand } from "../../modules/commands/aresUserCommand";
import { CommandCategories } from "../../util/commandCategories";

describe("Commands", () => {
  describe("AresChatInputCommand", () => {
    const command = new AresChatInputCommand(
      "test",
      "test",
      CommandCategories.General,

      false,
      async (i) => {
        i;
      }
    );
    test("it should be of the according type", () => {
      expect(command.type).toBe(ApplicationCommandType.ChatInput);
    });
  });

  describe("AresMessageCommand", () => {
    const command = new AresMessageCommand(
      "test",
      CommandCategories.General,
      false,
      async (i) => {
        i;
      }
    );
    test("it should be of the according type", () => {
      expect(command.type).toBe(ApplicationCommandType.Message);
    });
  });

  describe("AresUserCommand", () => {
    const command = new AresUserCommand(
      "test",
      CommandCategories.General,
      false,
      async (i) => {
        i;
      }
    );
    test("it should be of the according type", () => {
      expect(command.type).toBe(ApplicationCommandType.User);
    });
  });
});
