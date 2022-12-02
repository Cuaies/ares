import { AresEventManager } from "../modules/events/aresEventManager";

jest.mock("fs/promises");
jest.mock("../client");

let manager: AresEventManager;
beforeAll(() => {
  manager = new AresEventManager();
});

describe("Event Manager", () => {
  test("getter handlers should be defined", () => {
    expect(manager.handlers).toBeDefined();
  });
  describe("handlers loading method", () => {
    // TODO: implement
  });
  describe("handlers registration method", () => {
    // TODO: implement
  });
  describe("cache and register method", () => {
    test("it should call the caching and registering methods", async () => {
      const loadSpy = jest.spyOn(manager, "loadEventHandlers");
      const registerSpy = jest.spyOn(manager, "registerEventHandlers");
      await manager.loadAll(__dirname);
      expect(loadSpy).toHaveBeenCalled();
      expect(registerSpy).toHaveBeenCalled();
    });
  });
});
