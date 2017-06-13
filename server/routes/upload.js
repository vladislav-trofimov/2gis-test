// модуль публикации сообщений в twitter
const express = require('express');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const Twitter = require('twitter');
const config = require('../../server/config/twitter.json');
const router = express.Router();

let text; // текст твита

router.post('/file', (req, res) => {
  let form = new formidable.IncomingForm();
  form.multiples = false;
  form.uploadDir = path.join(__dirname, '/uploads');
  form.parse(req);
  form.on('file', function(field, file) {
    fs.renameSync(file.path, path.join(form.uploadDir, file.name)); // получение картинки для твита
    const client = new Twitter(config.twitter);
    let data = require('fs').readFileSync(__dirname+'/uploads/'+file.name);
    client.post('media/upload', {media: data}, function(error, media, response) {
      if (!error) {
        let status = {
          status: text,
          media_ids: media.media_id_string // Pass the media id string
        };
        client.post('statuses/update', status, function(error, tweet, response) {
          if (!error) {
            console.log(tweet);
          }
        });
      }
    });
  });
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

});

//получение текста твита
router.post('/text', (req, res) => {
  text = req.body.text || '';
  //console.log(req.body.text);
});






module.exports = router;
