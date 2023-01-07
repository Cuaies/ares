import { ErrorCodes } from "../../modules/logger/errorCodes";
import { ErrorMessages } from "../../modules/logger/errorMessages";
import { formatMessage } from "../../modules/logger/formatMessage";

export abstract class AresBaseError<E extends ErrorCodes> extends Error {
  abstract readonly name: string;

  constructor(code: E, ...args: Parameters<typeof ErrorMessages[E]>) {
    super(formatMessage(null, code, ...args));
  }
}
