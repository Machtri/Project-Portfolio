const path = require("path");
const isDev = require("electron-is-dev");
const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
let splash;

app.on("ready", () => {
    mainWindow = new BrowserWindow({ width: 900, height: 680, titleBarStyle: "hidden", show: false });
    mainWindow.loadURL(
        isDev ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../public/index.html")}`
    );

    splash = new BrowserWindow({ width: 1024, height: 752, frame: false, alwaysOnTop: true, titleBarStyle: "hidden" });
    splash.loadURL(`file://${path.join(__dirname, "../public/splash.html")}`)
    ;
    mainWindow.once("ready-to-show", () => {
        splash.destroy();
        mainWindow.show();
    });
    mainWindow.on("closed", () => (mainWindow = null));
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});