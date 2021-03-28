// ----------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const fs = require('fs');
// ----------------------------------------------------------------------------
const expressApp = express();
const tempDir = path.join(__dirname, '/data');
const tempImg = path.join(tempDir, '/img');
// ----------------------------------------------------------------------------
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}
if (!fs.existsSync(tempImg)) {
  fs.mkdirSync(tempImg);
}
// ----------------------------------------------------------------------------
expressApp.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
expressApp.get('/img/:path*', (req, res) => {
  res.sendFile(`${tempImg}/${req.params.path}${req.params[0]}`);
});
expressApp.listen(3002, () => {
  console.log(`Example app listening at http://localhost:${3002}`);
});
// ----------------------------------------------------------------------------
