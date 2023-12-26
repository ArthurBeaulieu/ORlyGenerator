const express = require('express');
const path = require('path');
const compression = require('compression');
const zlib = require('node:zlib');
// App and preferences
const version = '1.4.0';
const port = 1337;
const app = express();
// Ensure responses are compressed through this midleware
app.use(compression({
  level: zlib.constants.Z_BEST_COMPRESSION,
}));
// url definitions
app.use('/assets', express.static(path.join(__dirname, '../assets'), { // Serve static files
  maxAge: '864000000' // 10 days caching for app assets
}));
app.use('/css', express.static(path.join(__dirname, '../css'), { // Serve static files
  maxAge: '864000000' // 10 days caching for app assets
}));
app.use('/js', express.static(path.join(__dirname, './'), { // Serve static files
  maxAge: '864000000' // 10 days caching for app assets
}));
// Serve main html at /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
// Start server console
app.listen(port, () => {
  console.log(`${(new Date()).toISOString()} | ORlyGenerator v${version} | Server started and listening on port ${port}`);
});
