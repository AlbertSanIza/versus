const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
let mainWindow
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    })
    mainWindow.loadURL(process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    mainWindow.webContents.openDevTools()
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
