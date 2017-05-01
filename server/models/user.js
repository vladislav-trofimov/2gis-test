var mongoose = require('mongoose');
var options = require('../config/config');
var connection = mongoose.createConnection(options.mongoDatabase);

// create a schema
var userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean
});

// the schema is useless so far
// we need to create a model using it
var User = connection.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
