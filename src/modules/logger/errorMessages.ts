import { ErrorCodes } from "./errorCodes";

export const ErrorMessages = {
  [ErrorCodes.ProviderUninitialized]: () => "Provider is not yet initialized",
  [ErrorCodes.ProviderRequiresPreloaded]: () =>
    "Provider requires preloaded locales in order to create command localization maps",
  [ErrorCodes.MissingCommandDefault]: (commandName: string) =>
    `Missing default command localization for command [command=${commandName}]`,
};
