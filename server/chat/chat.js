// модуль для отправки сообщений в общем чате
module.exports = function (client, io) {
  client.on('message', function (data) {
    io.sockets.emit('message', data);
    client.join('room');
    client.broadcast.to('room').emit('for', 'hello');
  })
};
