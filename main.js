const { app, BrowserWindow } = require("electron");

const path = require("path");
const url = require("url");
const electron = require("electron");

let win;

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    resizable: false
  });
  // win.maximize();
  win.isResizable(false);
  win.setMenuBarVisibility(false);

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools();

  // Event when the window is closed.
  win.on("closed", function() {
    win = null;
  });
}

// Create window on electron intialization
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS specific close process
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});
