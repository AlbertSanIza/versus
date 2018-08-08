const { app, BrowserWindow } = require('electron')
const path = require('path')
const http = require('http')
const url = require('url')
var server = http.createServer()
var io = require('socket.io')(server)
server.listen(12345)
let mainWindow
io.on('connection', client => {
    client.on('event', data => {
        console.log("event")
        console.log(data)
    })
    client.on('disconnect',() => {
        console.log("disconnect")
    })
})

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
