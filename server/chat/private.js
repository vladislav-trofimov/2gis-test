module.exports = function (client, users, io) {
  client.on('subscribe',function(room){
    console.log('joining room', room);
    client.join(room);
  });

  client.on('send message',function(data){
    console.log('sending room post', data.room);
    client.broadcast.to(data.room).emit('conversation private post',{
      message: data.message
    });});

  client.on("private", function(data) {
    console.log(users['Tom']);
    //console.log(io.to(users[0]));
    users['Tom'].emit("private", { msg: data.msg });
    //client.emit("private", { from: 'Tom', to: data.to, msg: data.msg });
  });
};
