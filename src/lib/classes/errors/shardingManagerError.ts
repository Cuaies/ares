export default class AresLocalizationManagerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AresLocalizationManagerError";
  }
}
