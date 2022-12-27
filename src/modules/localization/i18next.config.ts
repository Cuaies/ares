import { InitOptions } from "i18next";
import path from "path";
import { FsBackendOptions } from "i18next-fs-backend";
import { Locale } from "discord.js";
import { isProductionEnvironment } from "../../util/helpers/stringUtil";

/**
 * Path to the locales' directory.
 */
const LOAD_PATH = path.join(__dirname, "locales/{{lng}}/{{ns}}.json");

/**
 * Path for writing the missing locales' keys.
 */
const MISSING_PATH = path.join(__dirname, "locales/{{lng}}/{{ns}}.missing.js");

/**
 * List of languages to use based on `NODE_ENV`'s value.
 */
const languages = isProductionEnvironment()
  ? Object.values(Locale)
  : [...Object.values(Locale), "dev"];

/**
 * The default language to use based on `NODE_ENV`'s value.
 */
const lng = isProductionEnvironment() ? Locale.EnglishUS : "dev";

/**
 * Options for initializing i18next with the i18next-fs-backend.
 */
export const options: InitOptions<FsBackendOptions> = {
  debug: process.env.DEBUG === "true" ? true : false,
  preload: languages,
  supportedLngs: languages,
  fallbackLng: lng,
  lng: lng,
  load: "currentOnly",
  saveMissing: true,
  backend: {
    loadPath: LOAD_PATH,
    addPath: MISSING_PATH,
  },
};
