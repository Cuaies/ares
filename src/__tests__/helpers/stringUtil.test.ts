import { Collection, Events } from "discord.js";
import { AresChatInputCommand } from "../../modules/commands/aresChatInputCommand";
import { AresMessageCommand } from "../../modules/commands/aresMessageCommand";
import { AresUserCommand } from "../../modules/commands/aresUserCommand";
import { CommandCategories } from "../../util/commandCategories";
import { isAresCommand, isEventType } from "../../util/helpers/stringUtil";

describe("isEventType", () => {
  test("it should return false on invalid arguments", () => {
    const DATA_SET = ["", "X"];
    DATA_SET.forEach((value) => {
      expect(isEventType(value)).toBe(false);
    });
  });
  test("it should return true on valid arguments", () => {
    expect(isEventType(Events.Warn)).toBe(true);
  });
});

describe("isAresCommand", () => {
  test("it should return false on invalid arguments", () => {
    const DATA_SET = ["", {}, [], 0];
    DATA_SET.forEach((value) => {
      expect(isAresCommand(value)).toBe(false);
    });
  });

  test("it should return true on valid arguments", () => {
    const DATA_SET = [
      new AresChatInputCommand(
        "test",
        "test",
        CommandCategories.General,
        false,
        async (i) => {
          i;
        }
      ),
      new AresUserCommand(
        "test",
        CommandCategories.General,
        false,
        async (i) => {
          i;
        }
      ),
      new AresMessageCommand(
        "test",
        CommandCategories.General,
        false,
        async (i) => {
          i;
        }
      ),
    ];
    DATA_SET.forEach((value) => {
      expect(isAresCommand(value)).toBe(true);
    });
  });
});
