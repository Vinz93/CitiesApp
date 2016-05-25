var express = require('express');

var bodyParder = require('body-parser');
var urlencode = bodyParder.urlencoded({ extended: false });

var redis = require('redis');
var client = redis.createClient();

var router = express.Router();
// app.engine('html', require('ejs'));

client.hset('cities','Canada', 'description');
client.hset('cities','Australia', 'description');
client.hset('cities','Espana', 'description');


router.route('/')
  .get(function (req , res) {
    client.hkeys('cities',function (error , names) {
      if(error) throw error;
      res.json(names);
    });
  })
  .post( urlencode , function (req , res) {
    var newCity = req.body;
    if(!newCity.name || !newCity.description){
      res.sendStatus(400);
      return false;
    }
    client.hset('cities',newCity.name, newCity.description, function (error) {
      if(error) throw error;
      res.status(201).json(newCity.name);
    });
  });

router.route('/:name')
  .get(function (req , res) {
    client.hget('cities',req.params.name , function (error, description) {
      if(error) throw error;
      res.status(200).render('show.ejs',{city: {name: req.params.name, description: description}});
      // res.render('show.ejs');
      // res.status(200).json(description);
    });
  })
    .delete(function (req, res) {
     client.hdel('cities',req.params.name, function (error) {
       if(error) throw error;
       res.sendStatus(204);
     });
  });

module.exports = router;
