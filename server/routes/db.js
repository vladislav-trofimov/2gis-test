const express = require('express');
const router = express.Router();
let User = require('../models/user');
var chris = new User({
    name: 'John',
    username: 'sevilayha89',
    password: 'password'
});

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
    res.json({"name":"John"});
});

module.exports = router;