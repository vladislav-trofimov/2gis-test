// модуль обработки сообщений в приватном чате
module.exports = function (client, users, privateUsers, io) {
  let tempList=[];
  client.on('subscribe',function(room){
    if (!tempList.includes(client.nickname)){  // если это новый участник чата, подключаем его
      tempList.push(client.nickname);
      client.join(room);
    }
  });
  // отправка сообщений всем в приватном чате
  client.on('send message',function(data){
    io.sockets.to(data.room).emit('conversation private post',{
      message: data.message
    });});

  // отправка сообщения конкретному пользователю (не используется)
  client.on("private", function(data) {
    users[data.to].emit("private", { msg: data.msg });
  });
};
