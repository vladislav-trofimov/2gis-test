// создание модели Пользователь
var mongoose = require('mongoose');
var options = require('../config/config');

var connection = mongoose.createConnection(options.mongoDatabase);
connection.on('error', function (err) {
  if (err)
    console.log('MongoDb connection error');
    connection.db.close();
    module.exports = false;
    return false;
  });

// создание схемы для модели Пользователь
  var userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
  });
  var User = connection.model('User', userSchema);
  module.exports = User;










