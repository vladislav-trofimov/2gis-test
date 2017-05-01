var mongoose = require('mongoose');
var options = require('../config/config');
var connection = mongoose.createConnection(options.mongoDatabase);

// create a schema
var taskSchema = new mongoose.Schema({
     name: { type: String, required: true, unique: true },
     dateStart: { type: Date, default: Date.now },
     dateFinish: { type: Date },
     reasponsiblePersons: [{type:String}],
     // comments: [{ user:String, body: String, date: Date }],
     // status:{type:String},
     // priority:{type:String},
});

// the schema is useless so far
// we need to create a model using it
var Task = connection.model('Task', taskSchema);

// make this available to our users in our Node applications
module.exports = Task;


//var Tank = connection.model('Tank', yourSchema);