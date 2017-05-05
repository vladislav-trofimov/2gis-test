const express = require('express');
const router = express.Router();
let User = require('../models/user');
let Task = require('../models/task');

/* GET api listing. */
router.get('/', (req, res) => {
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    });

    //res.send(JSON.stringify({ "name" : "John" }));

});

// '/db' - полуение POST запроса на добавление задачи
router.post('/', (req, res)=>{
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
    //res.json({"name":"John"});
});

router.get('/tasklist', (req, res)=>{
    User.find({}, function(err, users) {
        if (err) throw err;
        // object of all the users
        console.log(users);
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    });
});



module.exports = router;
