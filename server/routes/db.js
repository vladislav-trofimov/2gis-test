// api module
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
let User = require('../models/user');
let Marker = require('../models/markers');


// '/db/add' - adding the markers positions
router.post('/add', (req, res)=>{
  Marker.findOneAndUpdate({}, { $set: { list: req.body.list } }, { new: true }, function(err, doc) {
    if (err){
      console.log(err);
    }else{
      if (doc === null){
        let newMarker = Marker({
          list:req.body.list
        });
        newMarker.save(function (err) {
          if (err){
            console.log(err);
          }
        });
      }
      res.json('marker(s) saved successfully');
    }
  });
});

// 'db/list' - getting all markers positions
router.get('/list', (req, res)=>{
  Marker.find({}, function(err, markers) {
    if (err) {
      res.json(err);
    }else{
      res.setHeader('Content-Type', 'application/json');
      res.json(markers);
    }
  });
});

// 'db/delete' - delete all markers
router.get('/delete', (req, res)=>{
  Marker.remove({}, function(err, markers) {
    if (err) {
      res.json(err);
    }else{
      res.setHeader('Content-Type', 'application/json');
      console.log('marker(s) removed');
      res.json('marker(s) removed');
    }
  });
});


// 'db/adduser' - add new user
router.post('/adduser', (req, res)=>{
  "use strict";
  let pass = getHash(req.body.password);
  let newUser = new User({
    name: req.body.name,
    position: 'user',
    password: pass,
    admin: false
  });
  newUser.save(function (err) {
    if (err){
      res.setHeader('Content-Type', 'application/json');
      res.json(err);
      return console.log(err);
    }
    res.json('OK!');
  });
});

// 'db/checkuser' - check user login info
router.post('/checkuser', (req, res)=>{
  "use strict";
  console.log(req.body);
  let pass = getHash(req.body.password);
  User.find({ name: req.body.username }).
  where('password').
  equals(pass).
  exec(function(err, user) {
    if (err) throw err;
    if (user.length > 0) {
      res.json({name:user[0].name, admin:user[0].admin})
    }
  });
});

function getHash(password) {
  return crypto.createHmac('sha1', 'my secret world').update(password).digest('hex');
}

module.exports = router;
