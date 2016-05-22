var express = require('express');
var app = express();

app.get('/',function (req , res) {
  res.json('OK');
});

app.listen(3000, function () {
  console.log('this app is running on port 3000');
});
