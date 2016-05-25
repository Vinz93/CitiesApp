var request = require('supertest');
var app = require('./app');


describe('Request to the root path', function () {
  it('Returns a 200 status code ', function (done) {
    request(app)
      .get('/')
      .expect(200,done());
  });
  it(' Returns a HTML format',function (done) {
    request(app)
    .get('/')
    .expect('Content-Type',/html/,done);
  });
  // it('Returns an index file with cities',function (done) {
  //   request(app)
  //   .get('/')
  //   .expect(/cities/i, done);
  // });
});

describe('Listing cities on /cities', function () {
  it('Returns a 200 status code ',function (done) {
    request(app)
    .get('/cities')
    .expect(200,done);
  });

  it('Returns JSON format',function (done) {
    request(app)
    .get('/cities')
    .expect('Content-Type','application/json; charset=utf-8',done);
  });

  // it('Returns initial cities', function (done) {
  //   request(app)
  //   .get('/cities')
  //   .expect(JSON.stringify(['Canada','Australia','Espana']),done);
  // });
});

describe('Creating new cities',function() {
  it('Returns a 201 status', function(done) {
    request(app)
    .post('/cities')
    .send('name=Italia&description=torino+is+beatiful')
    .expect(201,done);
  });

  it('Return the city name', function (done) {
    request(app)
    .post('/cities')
    .send('name=Italia&description=torino+is+beatiful')
    .expect(/Italia/i,done);
  });
  it('Validates city name and description',function (done) {
      request(app)
      .post('/cities')
      .send('name=&description=')
      .expect(400,done);
  });
});

describe('Deleting cities', function () {
  it('Returns status code 204 no content',function (done) {
    request(app)
    .delete('/cities/Italia')
    .expect(204,done);
  });
});

describe('Show city Info',function () {
  it('return status code 200', function (done) {
    request(app)
    .get('/cities/Canada')
    .expect(200,done);
  });
});
