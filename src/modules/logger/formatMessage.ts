import { ErrorCodes } from "./errorCodes";
import { ErrorMessages } from "./errorMessages";
import { LoggerScopes } from "./loggerScopes";

/**
 * Formats a log message.
 * @param scope Optional parameter to specify the scope of the message.
 */
export const formatMessage = <E extends ErrorCodes>(
  scope: LoggerScopes | null,
  code: E,
  ...args: Parameters<typeof ErrorMessages[E]>
) => {
  const message = ErrorMessages[code];
  const errorCode = `[${
    scope ? scope + ":" + ErrorCodes[code] : ErrorCodes[code]
  }]`;

  return [errorCode, (message as (...args: any) => any)(...args)].join(" ");
};
