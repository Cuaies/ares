import { Events, Locale } from "discord.js";
import {
  AresChatInputCommand,
  AresChatInputCommandBuilder,
} from "../../modules/commands/aresChatInputCommand";
import { AresContextMenuCommandBuilder } from "../../modules/commands/aresContextMenuCommand";
import { AresMessageCommand } from "../../modules/commands/aresMessageCommand";
import { AresUserCommand } from "../../modules/commands/aresUserCommand";
import {
  isAresCommand,
  isEventType,
  isLocale,
} from "../../util/helpers/stringUtil";

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
        new AresChatInputCommandBuilder()
          .setName("test")
          .setDescription("test"),
        async (i) => {
          return;
        }
      ),
      new AresUserCommand(
        new AresContextMenuCommandBuilder().setName("test"),
        async (i) => {
          return;
        }
      ),
      new AresMessageCommand(
        new AresContextMenuCommandBuilder().setName("test"),
        async (i) => {
          return;
        }
      ),
    ];
    DATA_SET.forEach((value) => {
      expect(isAresCommand(value)).toBe(true);
    });
  });
});

describe("isLocale", () => {
  test("it should return false on invalid arguments", () => {
    const DATA_SET = ["test", "", {}, [], 0];
    DATA_SET.forEach((value) => {
      expect(isLocale(value)).toBe(false);
    });
  });

  test("it should return true on valid arguments", () => {
    const DATA_SET = [Locale.EnglishUS, Locale.Bulgarian];
    DATA_SET.forEach((value) => {
      expect(isLocale(value)).toBe(true);
    });
  });
});
