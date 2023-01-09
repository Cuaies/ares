import { AresCommandTranslation } from "../../ts/types/types";

/**
 * Checks if the given object is a valid `AresCommandTranslation`.
 */
export const isAresCommandLocale = (
  o: unknown
): o is AresCommandTranslation => {
  if (!o || o.constructor === Array) return false;
  if (["name"].every((key) => o.hasOwnProperty(key))) return true;
  return false;
};
