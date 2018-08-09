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
    expressApp.use('/static', express.static(__dirname + '/../build/static'))
    expressApp.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/../build/index.html'))
    })
    io.on('connection', socket => {
        console.log('User Connected')
        socket.on('disconnect', () => {
            console.log('User Disconnected')
        })
        socket.on('message', msg => {
            io.emit('message', msg)
        })
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
