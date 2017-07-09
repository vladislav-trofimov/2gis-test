// подключение модулей
const express = require('express');
const options = require('./server/config/config');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const db = require('./server/routes/db');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src')));

app.use('/db', db);


// all routes to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * set the port
 */
const port = process.env.PORT || options.port;
app.set('port', port);


// creating server
const server = http.createServer(app);


// launching server
server.listen(port, () => console.log(`API running on localhost:${port}`));
