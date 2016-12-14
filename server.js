var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(8000);

console.log('Listening http://127.0.0.1:8000');