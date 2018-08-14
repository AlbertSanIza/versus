const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
let mainWindow
var express = require('express')
var expressApp = express()
var http = require('http').Server(expressApp).listen(12345)
var io = require('socket.io')(http)
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    })
    expressApp.use('/static', express.static(__dirname + '/../build/static'))
    expressApp.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/../build/index.html'))
    })
    mainWindow.loadURL(process.env.ELECTRON_START_URL || "http://localhost:12345/#/main")
    if (process.env.ELECTRON_START_URL) {
        mainWindow.webContents.openDevTools()
    }
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show()
    })
    io.on('connection', socket => {
        socket.on('message', msg => {
            io.emit('message', msg)
        })
    })
})
app.on('window-all-closed', () => {
    app.quit()
})
