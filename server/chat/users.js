module.exports = function (client, users) {
  client.on('new user', function (data, callback) {
    if (data in users){
      callback(false);
    }else{
      callback(true);
      client.nickname = data;
      users[client.nickname] = client;
      updateUserList();
      //console.log(users);
    }
  });

  client.on('disconnect',function (data) {
    console.log('disconnected: '+data);
    if(!client.nickname)return;
    delete users[client.nickname];
    console.log('disconnected: '+client.nickname);
    updateUserList();
  });

  function updateUserList() {
    client.emit('usernames', Object.keys(users));
    client.broadcast.emit('usernames', Object.keys(users));
  }
};

