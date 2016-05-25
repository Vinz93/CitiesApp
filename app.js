var express = require('express');
var app = express();

 app.set('views', './public/views')

var cities = require('./routes/cities');
app.use('/cities',cities);
app.use(express.static('public'));


// encapsulamos la aplicacion en un modulo de node
module.exports = app;

// por una convencion y hacer test unitarios sencillos
 // la aplicacion se ejecuta en bin/www
// $ ./bin/www

// para hacer ese archivo ejecutable se debe correr el comando chmod +x bin/www
