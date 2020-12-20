import { app } from "electron";
import {showDialog} from "@/background";

const fs = require("fs");
const path = require("path");

export function writeToLogFile(msg) {
  const log = path.join(app.getPath("documents"), "navfit2020", "log.txt");
  fs.appendFile(log, `${Date().toString()}\n${msg}\n\n`, error => {
    if (error) showDialog("error", "PDF Template Download Error", "Error downloading NAVPERS, file a bug please!", null, error);
  });
}
