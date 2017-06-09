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
let privateUsers = {};

// Get our API routes
const db = require('./server/routes/db');
const upload = require('./server/routes/upload');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src')));
// Set our api routes

app.use('/db', db);

app.use('/upload', upload);

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
  chatHandle(client, io);
  userHandle(client, users, privateUsers);
  privateChatHandle(client, users, privateUsers, io);
});


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
