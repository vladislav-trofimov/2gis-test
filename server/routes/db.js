const express = require('express');
const router = express.Router();
const crypto = require('crypto');
let User = require('../models/user');
let Task = require('../models/task');

/* GET api listing. */

// '/' - полуение POST запроса на получение списка сотрудников
router.post('/', (req, res) => {
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        //console.log(users);
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    });



});

// '/db' - полуение POST запроса на добавление задачи
router.post('/addtask', (req, res)=>{
    console.log(req.body);
    let newTask = new Task({
        name:req.body.taskName,
        dateStart:req.body.dateStart,
        dateFinish:req.body.dateFinish,
        reasponsiblePersons:req.body.reasponsiblePersons
    });
    newTask.save(function (err) {
        if (err){
            res.setHeader('Content-Type', 'application/json');
            res.json(err);
            return console.log(err);
        }
        console.log('inserted');
    });
});

// 'db/tasklist' - полуение POST запроса на получение списка задач
router.post('/tasklist', (req, res)=>{
    Task.find({}, function(err, tasks) {
        if (err) throw err;
        // object of all the users
        console.log(tasks);
        res.setHeader('Content-Type', 'application/json');
        res.json(tasks);
    });
});

// 'db/addemployee' - полуение POST запроса на добавление сотрудника
router.post('/addemployee', (req, res)=>{
  "use strict";
  let pass = getHash(req.body.password);
  let newEmployee = new User({
    name: req.body.name,
    position: req.body.position,
    password: pass,
    //password: req.body.password,
    admin: req.body.admin
  });
  newEmployee.save(function (err) {
    if (err){
      res.setHeader('Content-Type', 'application/json');
      res.json(err);
      return console.log(err);
    }
    res.json('OK!');
    console.log('user inserted');
  });
});

// 'db/checkuser' - полуение POST запроса на проверку сотрудника
router.post('/checkuser', (req, res)=>{
  "use strict";
  console.log(req.body);
  let pass = getHash(req.body.password);
  User.find({ name: req.body.username }).
  where('password').
  equals(pass).
  exec(function(err, user) {
    if (err) throw err;
    console.log(user.length);
    if (user.length > 0) {
      console.log(user[0].name);
      res.json({name:user[0].name, admin:user[0].admin})
    }
  });
});

// 'db/updatestatus' - полуение POST запроса на изменение статуса задачи
router.post('/updatestatus', (req, res)=>{
  "use strict";
  Task.findById(req.body.id, function (err, task) {
    if (err) return handleError(err);
    task.status = 'завершена';
    task.save(function (err, updatedTask) {
      if (err) return handleError(err);
      console.log(updatedTask);
      //res.send(updatedTank);
    });
  });
});

router.post('/updatetask', (req, res)=>{
  "use strict";
  Task.findById(req.body.id, function (err, task) {
    if (err) return handleError(err);
    task.name = req.body.name;
    task.dateStart = req.body.dateStart;
    task.dateFinish = req.body.dateFinish;
    task.reasponsiblePersons = req.body.reasponsiblePersons;
    task.save(function (err, updatedTask) {
      if (err) return handleError(err);
      console.log(updatedTask);
      //res.send(updatedTank);
    });
  });
});


function getHash(password) {
  return crypto.createHmac('sha1', 'my secret world').update(password).digest('hex');
}

module.exports = router;
