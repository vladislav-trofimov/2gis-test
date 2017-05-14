// Get dependencies
const express = require('express');
const options = require('./server/config/config');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
let chatHandle = require('./server/chat/chat');
let userHandle = require('./server/chat/users');
let privateChatHandle = require('./server/chat/private');

let users = {};

// Get our API routes
const api = require('./server/routes/api');
const db = require('./server/routes/db');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

app.use('/db', db);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || options.port;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

const io = require('socket.io').listen(server);
io.sockets.on('connection', function(client){
  console.log('a user connected');
  chatHandle(client);
  userHandle(client, users);
  privateChatHandle(client, users, io);
});


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
