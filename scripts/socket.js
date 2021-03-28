// ----------------------------------------------------------------------------
const fs = require('fs');
// ----------------------------------------------------------------------------
const settings = JSON.parse(fs.readFileSync('./scripts/settings.json'));
const io = require('socket.io')(Number(settings.socket.port), { cors: { origin: '*' } });
// ----------------------------------------------------------------------------
io.on('connection', socket => {
  socket.on('socket', data => {
    // React
    if (data.origin === 'react') {
      switch (data.message) {
        case 'buy':
          // io.emit('hue', { origin: 'socket', message: 'refresh', on: true });
          io.emit('chrome', { origin: 'socket', message: 'buy' });
          break;
        case 'sell':
          io.emit('hue', { origin: 'socket', message: 'refresh', on: true });
          io.emit('chrome', { origin: 'socket', message: 'sell' });
          break;
        case 'monitor':
          monitor = data.monitor;
          if (!monitor) {
            io.emit('hue', { origin: 'socket', message: 'black' });
          }
          io.emit('chrome', { origin: 'socket', message: 'monitor', monitor: data.monitor });
          break;
        case 'refresh':
          io.emit('hue', { origin: 'socket', message: 'refresh', on: true });
          io.emit('chrome', { origin: 'socket', message: 'refresh' });
          break;
        default:
      }
    }
  });
});
// ----------------------------------------------------------------------------
