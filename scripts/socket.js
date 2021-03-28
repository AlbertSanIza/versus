// ----------------------------------------------------------------------------
const io = require('socket.io')(12345, { cors: { origin: '*' } });
const storage = require('electron-json-storage');
const path = require('path');
const fs = require('fs');
const ip = require('ip');
// ----------------------------------------------------------------------------
const tempDir = path.join(__dirname, '/data');
const tempImg = path.join(tempDir, '/img');
storage.setDataPath(tempDir);

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}
if (!fs.existsSync(tempImg)) {
  fs.mkdirSync(tempImg);
}
// ----------------------------------------------------------------------------
io.on('connection', socket => {
  socket.on('visualizer', msg => {
    io.emit('visualizer', msg);
  });
  socket.on('events', (msg, fn) => {
    switch (msg.type) {
      case 'get':
        storage.get('events', (getErrors, data) => {
          if (!getErrors && data.length > 0) {
            fn(data);
          }
        });
        break;
      case 'set':
        storage.set('events', msg.payload);
        break;
      default:
        break;
    }
  });
  socket.on('thematics', (msg, fn) => {
    switch (msg.type) {
      case 'get':
        storage.get('thematics', (getErrors, data) => {
          if (!getErrors && data.length > 0) {
            fn(data);
          }
        });
        break;
      case 'set':
        storage.set('thematics', msg.payload);
        break;
      default:
        break;
    }
  });
  socket.on('formats', (msg, fn) => {
    switch (msg.type) {
      case 'get':
        storage.get('formats', (getErrors, data) => {
          if (!getErrors && data.length > 0) {
            fn(data);
          }
        });
        break;
      case 'set':
        storage.set('formats', msg.payload);
        break;
      default:
        break;
    }
  });
  socket.on('competitors', (msg, fn) => {
    switch (msg.type) {
      case 'get':
        storage.get('competitors', (getErrors, data) => {
          if (!getErrors && data.length > 0) {
            fn(data);
          }
        });
        break;
      case 'set':
        storage.set('competitors', msg.payload);
        break;
      case 'image':
        fn(fs.writeFileSync(path.join(tempImg, msg.payload.photo), msg.payload.file, 'binary'));
        break;
      default:
        break;
    }
  });
  socket.on('ip', (msg, fn) => {
    switch (msg.type) {
      case 'get':
        fn({ ip: ip.address() });
        break;
      default:
        break;
    }
  });
});
// ----------------------------------------------------------------------------
