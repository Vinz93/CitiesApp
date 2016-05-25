var express = require('express');
var app = express();

var bodyParder = require('body-parser');
var urlencode = bodyParder.urlencoded({ extended: false });

var redis = require('redis');
var client = redis.createClient();

// app.engine('html', require('ejs'));

client.hset('cities','Canada', 'description');
client.hset('cities','Australia', 'description');
client.hset('cities','Espana', 'description');

app.use(express.static('public'));

app.get('/cities',function (req , res) {
  client.hkeys('cities',function (error , names) {
    if(error) throw error;
    res.json(names);
  });
});

app.get('/cities/:name',function (req , res) {
  client.hget('cities',req.params.name , function (error, description) {
    if(error) throw error;
    res.status(200).render('show.ejs',{city: {name: req.params.name, description: description}});
    // res.render('show.ejs');
    // res.status(200).json(description);
  });
});

app.post('/cities', urlencode , function (req , res) {
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

app.delete('/cities/:name',function (req, res) {
   client.hdel('cities',req.params.name, function (error) {
     if(error) throw error;
     res.sendStatus(204);
   });
});

// encapsulamos la aplicacion en un modulo de node
module.exports = app;

// por una convencion y hacer test unitarios sencillos
 // la aplicacion se ejecuta en bin/www
// $ ./bin/www

// para hacer ese archivo ejecutable se debe correr el comando chmod +x bin/www
