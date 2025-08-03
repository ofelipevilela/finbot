import fs from "fs";
import path from "path";

export type LogLevel = "info" | "warn" | "error" | "debug";

const LOG_FILE =
  process.env.LOG_FILE || path.resolve(process.cwd(), "finbot.log");

function format(level: LogLevel, message: string, meta?: any) {
  const time = new Date().toISOString();
  let line = `[${time}] [${level.toUpperCase()}] ${message}`;
  if (meta) {
    line += " " + JSON.stringify(meta);
  }
  return line;
}

export function log(level: LogLevel, message: string, meta?: any) {
  const line = format(level, message, meta);
  fs.appendFileSync(LOG_FILE, line + "\n");
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info: (msg: string, meta?: any) => log("info", msg, meta),
  warn: (msg: string, meta?: any) => log("warn", msg, meta),
  error: (msg: string, meta?: any) => log("error", msg, meta),
  debug: (msg: string, meta?: any) => log("debug", msg, meta),
};
