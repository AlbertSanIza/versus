const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
const url = require('url')
const os = require('os')
let mainWindow
var express = require('express')
var expressApp = express()
var http = require('http').Server(expressApp).listen(12345)
var io = require('socket.io')(http)
var storage = require('electron-json-storage')
storage.setDataPath(os.tmpdir() + '/versus')

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        minWidth: 900,
        minHeight: 600,
        useContentSize: true,
        show: false
    })
    expressApp.use('/', express.static(__dirname + '/../build'))
    expressApp.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/../build/index.html'))
    })
    mainWindow.loadURL(process.env.ELECTRON_START_URL || "http://localhost:12345/#/main/visuals")
    if (process.env.ELECTRON_START_URL) {
        mainWindow.webContents.openDevTools()
    }
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show()
    })
    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault()
        shell.openExternal(url)
    })
    io.on('connection', socket => {
        socket.on('message', msg => {
            io.emit('message', msg)
        })
        socket.on('events', msg => {
            switch (msg.type) {
                case 'get':
                storage.get('events', (getErrors, data) => {
                    socket.emit('events', data)
                })
                break
                case 'set':
                storage.set('events', msg.payload)
                break
            }
        })
        socket.on('thematics', msg => {
            switch (msg.type) {
                case 'get':
                storage.get('thematics', (getErrors, data) => {
                    socket.emit('thematics', data)
                })
                break
                case 'set':
                storage.set('thematics', msg.payload)
                break
            }
        })
        socket.on('competitors', msg => {
            storage.set('competitors', msg, setError => {
                switch (msg.type) {
                    case 'get':
                    storage.get('competitors', (getErrors, data) => {
                        socket.emit('competitors', data)
                    })
                    break
                    case 'set':
                    storage.set('competitors', msg.payload)
                    break
                }
            })
        })
    })
})
app.on('window-all-closed', () => {
    app.quit()
})
