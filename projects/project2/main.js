const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Allow Node.js integration in your frontend code
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "frontend/public/index.html"), // Path to your frontend's main HTML file
      protocol: "file:",
      slashes: true,
    })
    
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

    mainWindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
