// создание модели Задача
var mongoose = require('mongoose');
var options = require('../config/config');

var connection = mongoose.createConnection(options.mongoDatabase);
connection.on('error', function (err) {
  if (err)
    console.log('MongoDb connection error');
  connection.db.close();
  module.exports = false;
});

var commentSchema = new mongoose.Schema({
 name: {type: String},
 text: {type: String},
 date: {type: Date, default: Date.now}
});

// создание схемы для модели Задача
var taskSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  dateStart: {type: Date, default: Date.now},
  dateFinish: {type: Date},
  reasponsiblePersons: [{type: String}],
  status: {type: String, default: "активная"},
  comments: [commentSchema]
});


  var Task = connection.model('Task', taskSchema);


  module.exports = Task;





//var Tank = connection.model('Tank', yourSchema);

