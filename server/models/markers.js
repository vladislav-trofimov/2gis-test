// building Marker model
let mongoose = require('mongoose');
let options = require('../config/config');

let connection = mongoose.createConnection(options.mongoDatabase);
connection.on('error', function (err) {
  if (err)
    console.log('MongoDb connection error');
  connection.db.close();
  module.exports = false;
});


// building schema for marker model
let markerSchema = new mongoose.Schema({
  list: {type: Array, required: true, unique: true},
});


let Marker = connection.model('Marker', markerSchema);


module.exports = Marker;


