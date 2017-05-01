var mongoose = require('mongoose');
var options = require('../config/config');
mongoose.connect(options.mongoDatabase);

// create a schema
var taskSchema = new Schema({
     name: { type: String, required: true, unique: true },
     dateStart: { type: Date, default: Date.now },
     dateFinish: { type: Object },
     reasponsiblePersons: [{user:string}],
     comments: [{ user:String, body: String, date: Date }],
     status:{type:String},
     priority:{type:String},
});

// the schema is useless so far
// we need to create a model using it
var Task = mongoose.model('Task', taskSchema);

// make this available to our users in our Node applications
module.exports = Task;
