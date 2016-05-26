## Basic Express App
Esta es una simple aplicacion donde se usan las siguientes technologias

-Express
-Redis
-Supertest & Mocha

Es necesario tener instalado Redis.

Todas las dependencias de la aplicacion se encuentra en el Package.json


### Instalacion
```
$ npm install
```
### Uso

Para ejecutar la aplicacion
```
$ ./bin/www
```
### Pruebas Unitarias

Para correr las pruebas unitarias
```
$ npm test
```
### Redis

Algunas funciones basicas en redis

```js

var redis = require('redis');
var client = redis.createClient();

Create
client.hset('cities',key, value);

Read
client.hget('cities', key , function (error,value) {
});

Read all keys

client.hkeys('cities',function (error , keys) {
});

Delete
client.hdel('cities',key, function (error) {
});
```
### Supertest & Mocha

Ejemplo de algunas de las pruebas Unitarias

```js
var request = require('supertest');
var app = require('./app');

describe('Show city Info',function () {
  it('return status code 200', function (done) {
    request(app)
    .get('/cities/Canada')
    .expect(200,done);
  });

  it('return HTML format', function (done) {
    request(app)
    .get('/cities/Canada')
    .expect('Content-Type',/html/,done);
  });

  it('return the information of the giving city', function (done) {
    request(app)
    .get('/cities/Canada')
    .expect(/cold/,done);
  });
});
```

Vincenzo Bianco
