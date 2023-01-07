import { ErrorCodes } from "../errorCodes";
import { ErrorMessages } from "../errorMessages";
import { AresBaseError } from "./baseError";

export default class AresLocalizationManagerError<
  E extends ErrorCodes
> extends AresBaseError<ErrorCodes> {
  readonly name = "AresLocalizationManagerError";

  constructor(code: E, ...args: Parameters<typeof ErrorMessages[E]>) {
    super(code, ...args);
  }
}
