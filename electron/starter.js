const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
const url = require('url')
const os = require('os')
const fs = require('fs')
let mainWindow
var express = require('express')
var expressApp = express()
var http = require('http').Server(expressApp).listen(12345)
var io = require('socket.io')(http)
var storage = require('electron-json-storage')
var tempDir = path.join(os.tmpdir(), '/versus')
var tempImg = path.join(tempDir, '/img')
storage.setDataPath(tempDir)

if(!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
}
if(!fs.existsSync(tempImg)) {
    fs.mkdirSync(tempImg)
}

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
    expressApp.get('/img/:path*', (req, res) => {
        res.sendFile(tempImg + '/' + req.params.path + req.params[0])
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
        socket.on('visualizer', msg => {
            io.emit('visualizer', msg)
        })
        socket.on('events', (msg, fn) => {
            switch (msg.type) {
                case 'get':
                storage.get('events', (getErrors, data) => {
                    if(!getErrors && data.length > 0) {
                        fn(data)
                    }
                })
                break
                case 'set':
                storage.set('events', msg.payload)
                break
            }
        })
        socket.on('thematics', (msg, fn) => {
            switch (msg.type) {
                case 'get':
                storage.get('thematics', (getErrors, data) => {
                    if(!getErrors && data.length > 0) {
                        fn(data)
                    }
                })
                break
                case 'set':
                storage.set('thematics', msg.payload)
                break
            }
        })
        socket.on('competitors', (msg, fn) => {
            switch (msg.type) {
                case 'get':
                storage.get('competitors', (getErrors, data) => {
                    if(!getErrors && data.length > 0) {
                        fn(data)
                    }
                })
                break
                case 'set':
                storage.set('competitors', msg.payload)
                break
                case 'image':
                fs.writeFile(path.join(tempImg, msg.payload.photo), msg.payload.file, 'binary', err => {
                    fn(true)
                })
                break
            }
        })
        socket.on('settings', (msg, fn) => {
            switch (msg.type) {
                case 'get':
                fn({ tempDir: tempDir })
                break
                case 'openTempDir':
                shell.openItem(tempDir)
                break
            }
        })
    })
})
app.on('window-all-closed', () => {
    app.quit()
})
