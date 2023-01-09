/**
 * Returns true if the current environment is production.
 */
export const isProductionEnvironment = () => {
  return process.env.NODE_ENV === "production";
};
