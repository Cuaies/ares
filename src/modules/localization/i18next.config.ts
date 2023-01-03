import { InitOptions } from "i18next";
import path from "path";
import { FsBackendOptions } from "i18next-fs-backend";
import { Locale } from "discord.js";
import { readdir } from "fs/promises";
import { isLocale } from "../../util/helpers/stringUtil";

/**
 * The default locale to be used.
 */
export const DEFAULT_LOCALE = Locale.EnglishUS;

/**
 * Options for initializing i18next with the i18next-fs-backend.
 */
export const createProviderOptions = async (): Promise<
  InitOptions<FsBackendOptions>
> => {
  /**
   * Path to the locales' directory.
   */
  const LOCALES_PATH = path.join(__dirname, "locales");

  /**
   * Path for loading the locales' keys using the backend.
   */
  const LOAD_PATH = path.join(__dirname, "locales", "{{lng}}", "{{ns}}.json");

  /**
   * Path for writing the missing locales' keys.
   */
  const MISSING_PATH = path.join(
    __dirname,
    "locales",
    "{{lng}}",
    "{{ns}}.missing.js"
  );

  /**
   * List of languages to use based on `NODE_ENV`'s value.
   */
  const languages = await getAvailableLocales(LOCALES_PATH);

  /**
   * The default language to use based on `NODE_ENV`'s value.
   */
  const lng = DEFAULT_LOCALE;

  return {
    debug: process.env.DEBUG === "true" ? true : false,
    ns: ["commands"],
    preload: languages,
    supportedLngs: languages,
    lng: lng,
    load: "currentOnly",
    saveMissing: true,
    backend: {
      loadPath: LOAD_PATH,
      addPath: MISSING_PATH,
    },
  };
};

/**
 * Returns a promise that resolves to an array of available locales.
 */
async function getAvailableLocales(pathToLocales: string) {
  const direns = await readdir(pathToLocales, {
    withFileTypes: true,
  });

  return direns
    .filter((dirent) => dirent.isDirectory() && isLocale(dirent.name as Locale))
    .map((dir) => dir.name);
}
