module.exports = function (client, io) {
  client.on('message', function (data) {
    //console.log('data from user: ' + data);
    //client.emit('message', { hello: 'world' });
    //client.broadcast.emit('message', data);
    io.sockets.emit('message', data);

    client.join('room');
    client.broadcast.to('room').emit('for', 'hello');

    //client.join('room');
    //client.in('room').emit('message','room message');

    // client.on('room', function(room) {
    //   socket.join(room);
    //   client.in(room).emit('message','room message');
    // });

  })
};
