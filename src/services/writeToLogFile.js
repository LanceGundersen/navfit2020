import { app } from "electron";

const fs = require("fs");
const path = require("path");

export function writeToLogFile(msg) {
  const log = path.join(app.getPath("documents"), "navfit2020", "log.txt");
  fs.appendFile(log, `${Date().toString()}\n${msg}\n\n`, err => {
    if (err) console.log("Logging Error: ", err);
  });
}
