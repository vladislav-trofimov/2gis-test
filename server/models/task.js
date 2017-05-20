var mongoose = require('mongoose');
var options = require('../config/config');

var connection = mongoose.createConnection(options.mongoDatabase);
connection.on('error', function (err) {
  if (err)
    console.log('MongoDb connection error');
  connection.db.close();
  module.exports = false;
  //return false;
});

var commentSchema = new mongoose.Schema({
 name: {type: String},
 text: {type: String},
 date: {type: Date, default: Date.now}
});

// create a  Task schema
var taskSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  dateStart: {type: Date, default: Date.now},
  dateFinish: {type: Date},
  reasponsiblePersons: [{type: String}],
  status: {type: String, default: "активная"},
  comments: [commentSchema]
    //  [{type:Object, default:{}}],
    // priority:{type:String},
});

// the schema is useless so far
// we need to create a model using it
  var Task = connection.model('Task', taskSchema);

// make this available to our users in our Node applications
  module.exports = Task;

// create a  comment schema - children for taskSchema



//var Tank = connection.model('Tank', yourSchema);

