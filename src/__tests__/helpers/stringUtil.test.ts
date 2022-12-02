import { Events } from "discord.js";
import { isEventType } from "../../util/helpers/stringUtil";

describe("stringUtil", () => {
  test("isEventType", () => {
    const DATA_SET = ["", "X"];
    DATA_SET.forEach((value) => {
      expect(isEventType(value)).toBe(false);
    });
    expect(isEventType(Events.Warn)).toBe(true);
  });
});
