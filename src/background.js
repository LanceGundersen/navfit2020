import { app, protocol, BrowserWindow, shell, ipcMain, dialog } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import exportEval from "@/services/evalExport";
import api from "@/store/api";
import { writeToLogFile } from "@/services/writeToLogFile";

const path = require("path");

const DownloadManager = require("electron-download-manager");

const navpersURL = "https://github.com/LanceGundersen/navfit2020/raw/dev/pdfTemplates/NAVPERS_1616-26_Rev11-11.pdf";

const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

DownloadManager.register({
  downloadFolder: `${app.getPath("documents")}/navfit2020`
});

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, "preload.js")
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these
    // lines
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (error) {
      if (error) showDialog("error", "Vue Devtools", "Vue Devtools failed to install:", null, error.toString());
    }
  }
  createWindow();
  DownloadManager.download({
    url: navpersURL
  }, error => {
    if (error) showDialog("error", "PDF Template Download Error", "Error downloading NAVPERS, file a bug please!", null, error);
  });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

export function showDialog(type, title, msg, filePath, error) {
  writeToLogFile(`${type}: ${title}, ${msg} | File Path:  ${filePath} | Stacktrace: ${error}`);
  win.webContents.send("dialog:show", { type, title, msg, filePath, error, });
}

ipcMain.on("db:load", async () => {
  win.webContents.send("db:loaded", JSON.parse(JSON.stringify(await api.readDatabase())));
});

ipcMain.on("db:add:sailor", async (event, args) => {
  const result = await api.addSailor(args);
  const sailor = await api.getSailor(result);
  if (sailor.uuid) {
    win.webContents.send("db:add:sailor:result", sailor);
  } else {
    showDialog("error", "Add Sailor Error", "Error adding Sailor", null, result.error);
  }
});

ipcMain.on("db:update:sailor", async (event, args) => {
  const result = await api.updateSailor(args);
  if (result) {
    win.webContents.send("db:update:sailor:result", result);
  } else {
    showDialog("error", "Add Sailor Record Error", "Error adding Sailor record", null, result.error);
  }
});

ipcMain.on("db:delete:sailor", async (event, args) => {
  const result = await api.deleteSailor(args);
  if (result) {
    win.webContents.send("db:update:sailor:result", result);
  } else {
    showDialog("error", "Delete Sailor Error", "Error deleting Sailor", null, result.error);
  }
});

ipcMain.on("db:add:record", async (event, args) => {
  const result = await api.addRecord(args);
  const record = await api.getRecord(result);
  if (record) {
    win.webContents.send("db:add:record:result", record);
  } else {
    showDialog("error", "Add Record Error", "Error adding record", null, result.error);
  }
});

ipcMain.on("db:update:record", async (event, args) => {
  const result = await api.updateRecord(args);
  if (result.id) {
    win.webContents.send("db:update:record:result", result);
    showDialog(
      "success",
      "Eval Updated",
      "The evaluation was successfully updated.",
      null
    );
  } else {
    showDialog("error", "Update Record Error", "Error updating record", null, result.error);
  }
});

ipcMain.on("db:delete:record", async (event, args) => {
  const result = await api.deleteRecord(args);
  if (result) {
    win.webContents.send("db:delete:record:result", args.recordid);
  } else {
    showDialog("error", "Delete Record Error", "Error deleting record", null, result.error);
  }
});

ipcMain.on("db:add:commandDefaults", async (event, args) => {
  const result = await api.saveCommandDefaults(args);
  win.webContents.send("db:add:commandDefaults:result", result);
});

ipcMain.on("open:feedback", event => {
  event.preventDefault();
  shell.openExternal("https://navfit.hellonext.co/");
});

ipcMain.on("open:githubRepo", event => {
  event.preventDefault();
  shell.openExternal("https://github.com/LanceGundersen/navfit2020/releases");
});

ipcMain.on("open:gitHubAnnouncement", event => {
  event.preventDefault();
  shell.openExternal("https://github.com/LanceGundersen/navfit2020/blob/prod/README.md");
});

ipcMain.on("pdf:export", async (event, args) => {
  const options = {
    title: "Save new file as...",
    defaultPath: `${app.getPath("documents")}/navfit2020/new_file.pdf`,
    filters: [
      { name: "Custom File Type", extensions: ["pdf"] }
    ]
  };

  const saveDialog = dialog.showSaveDialog(win, options);

  saveDialog.then(saveTo => {
    if (!saveTo.canceled) exportEval(args.sailor, args.id, saveTo.filePath);
  });
});
