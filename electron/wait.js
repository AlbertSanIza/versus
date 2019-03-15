const net = require('net');
const exec = require('child_process').exec;

const client = new net.Socket();
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

let startedElectron = false;
const tryConnection = () => client.connect({ port: port }, () => {
  client.end();
  if (!startedElectron) {
    console.log('Starting Electron');
    startedElectron = true;
    exec('npm run electron');
  }
});

tryConnection();

client.on('error', error => {
  setTimeout(tryConnection, 1000);
});
