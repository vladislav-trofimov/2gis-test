module.exports = function (client, users, privateUsers) {

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
    delete privateUsers[client.nickname];
    console.log('disconnected: '+client.nickname);
    updateUserList();
    updatePrivateUserList();
    if (Object.keys(privateUsers).length === 0){
      console.log('private chat empty');
      //client.broadcast.emit('close private chat');
    }
    // add condition to chat close in case of users absent
  });



  client.on("new private user", function (data) {
    if( !(data.user in  privateUsers)){
      client.nickname = data.user;
      privateUsers[client.nickname] = client;
      //console.log(privateUsers);
      updatePrivateUserList();
    }
    if( !(data.master in  privateUsers)){
      client.nickname = data.master;
      privateUsers[client.nickname] = client;
      //console.log(privateUsers);
      updatePrivateUserList();
    }

  });


  function updateUserList() {
    client.emit('usernames', Object.keys(users));
    client.broadcast.emit('usernames', Object.keys(users));
  }

  function updatePrivateUserList() {
    client.emit('privateUsernames', Object.keys(privateUsers));
    client.broadcast.emit('privateUsernames', Object.keys(privateUsers));
  }

};

