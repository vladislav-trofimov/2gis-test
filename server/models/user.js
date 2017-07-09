// building User model
let mongoose = require('mongoose');
let options = require('../config/config');

let connection = mongoose.createConnection(options.mongoDatabase);
connection.on('error', function (err) {
  if (err)
    console.log('MongoDb connection error');
    connection.db.close();
    module.exports = false;
    return false;
  });

// building schema for User model
  let userSchema = new mongoose.Schema({
    name:{ type: String, required: true, unique: true },
    position: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
  });
  let User = connection.model('User', userSchema);
  module.exports = User;










