// подключение модулей
const express = require('express');
const options = require('./server/config/config');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
let chatHandle = require('./server/chat/chat');
let userHandle = require('./server/chat/users');
let privateChatHandle = require('./server/chat/private');

let users = {}; // объект хранящий пользователей в общем чате
let privateUsers = {}; // объект хранящий пользователей в приватном чате


const db = require('./server/routes/db');
const upload = require('./server/routes/upload');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Расположение статичных файлов
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src')));


app.use('/db', db);

app.use('/upload', upload);

// отлавливаем все посторонние маршруты и перенаправляем на index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * установка порта в параметрах окружения.
 */
const port = process.env.PORT || options.port;
app.set('port', port);


// создание сервера

const server = http.createServer(app);

// подключение websockets
const io = require('socket.io').listen(server);
io.sockets.on('connection', function(client){
  console.log('a user connected');
  chatHandle(client, io);
  userHandle(client, users, privateUsers);
  privateChatHandle(client, users, privateUsers, io);
});

// запуск сервера
server.listen(port, () => console.log(`API running on localhost:${port}`));
