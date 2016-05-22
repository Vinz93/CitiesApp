var express = require('express');
var app = express();

app.get('/',function (req , res) {
  res.json('OK');
});


// encapsulamos la aplicacion en un modulo de node
module.exports = app;

// por una convencion y hacer test unitarios sencillos
 // la aplicacion se ejecuta en bin/www
// $ ./bin/www

// para hacer ese archivo ejecutable se debe correr el comando chmod +x bin/www
