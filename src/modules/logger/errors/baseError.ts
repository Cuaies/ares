import { ErrorCodes } from "../errorCodes";
import { ErrorMessages } from "../errorMessages";
import { formatMessage } from "../formatMessage";

export abstract class AresBaseError<E extends ErrorCodes> extends Error {
  abstract readonly name: string;

  constructor(code: E, ...args: Parameters<typeof ErrorMessages[E]>) {
    super(formatMessage(null, code, ...args));
  }
}
