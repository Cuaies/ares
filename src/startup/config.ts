import "dotenv/config";
import config from "config";
import logger from "../modules/logger/logger";

export const PLACEHOLDERS = [
  "TOKEN",
  "SNOWFLAKE",
  "URL",
  "CONNECTION",
  "# EDIT THIS",
];

/**
 * Check environment's integrity.
 */
export const EnvValidation = (obj: { [name: string]: unknown }): boolean => {
  let validConfig = true;

  if (!Object.values(obj).length) {
    return (validConfig = false);
  }

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    logger.debug(key, {
      value,
    });

    switch (typeof value) {
      case "string":
        if (
          value === "" ||
          PLACEHOLDERS.some((placeholder) => value.includes(placeholder))
        ) {
          validConfig = false;
          logger.error("Required key's value requires modification. [%s]", key);
        }
        break;
      case "object":
        if (value == null) {
          validConfig = false;
          break;
        }
        if (!Array.isArray(value))
          EnvValidation(value as { [name: string]: unknown });
        break;
      default:
        validConfig = false;
    }
  }

  return validConfig;
};

logger.debug("Configuration validation");
EnvValidation(config.util.toObject());
