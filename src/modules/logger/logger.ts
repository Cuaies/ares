import { createLogger, format, transports } from "winston";
import { consoleFormat } from "winston-console-format";
import path from "path";

const logger = createLogger({
  level: "info",
  defaultMeta: { service: "ares-client" },
  silent: process.env.JEST_WORKER_ID !== undefined,
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../logs/ares-client-error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(__dirname, "../../logs/ares-client-combined.log"),
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, "../../logs/ares-client-exceptions.log"),
    }),
    new transports.File({
      filename: path.join(__dirname, "../../logs/ares-client-combined.log"),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      level: "silly",
      handleExceptions: true,
      format: format.combine(
        format.colorize({ all: true }),
        format.padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: ["timestamp", "service"],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: Infinity,
          },
        })
      ),
    })
  );
}

export default logger;
