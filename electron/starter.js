const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 234,
    minWidth: 300,
    minHeight: 234,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
  });
  mainWindow.setMenu(null);
  mainWindow.loadFile(path.join(__dirname, 'app/index.html'));
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
  });
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
