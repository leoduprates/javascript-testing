const server = require('../../src/server/server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');

describe('POST /api/cards', () => {
  let mongodb, id;

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    const URI = mongodb.getUri();

    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongodb.stop();
  });


  it('POST /api/cards - should create a new card', (done) => {
    request(server)
      .post('/api/cards')
      .set('Accept', 'application/json')
      .send({
        title: 'This is a title.',
        description: 'This is a description.',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body._id).not.toBeNull();
        expect(response.body.title).toEqual('This is a title.');
        expect(response.body.description).toEqual('This is a description.');
        id = response.body._id
        done();
      });
  });

  it('POST /api/cards - should return 400 status error when body is empty', (done) => {
    request(server)
      .post('/api/cards')
      .set('Accept', 'application/json')
      .send({})
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual('body content cannot be empity');
        done();
      });
  });

  it('GET /api/cards - should get cards', (done) => {
    request(server)
      .get('/api/cards')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]._id).not.toBeNull();
        expect(response.body[0].title).toEqual('This is a title.');
        expect(response.body[0].description).toEqual('This is a description.');
        done();
      });
  });

  it('GET /api/cards - should get card by id', (done) => {
    request(server)
      .get(`/api/cards/${id}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body._id).not.toBeNull();
        expect(response.body.title).toEqual('This is a title.');
        expect(response.body.description).toEqual('This is a description.');
        done();
      });
  });

  it('PUT /api/cards - should update the card', (done) => {
    request(server)
      .put(`/api/cards/${id}`)
      .set('Accept', 'application/json')
      .send({
        title: 'Update title.',
        description: 'Update description.',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body._id).not.toBeNull();
        expect(response.body.title).toEqual('Update title.');
        expect(response.body.description).toEqual('Update description.');
        done();
      });
  });

  it('DELETE /api/cards - should delete the card', (done) => {
    request(server)
      .delete(`/api/cards/${id}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('card was deleted successfully');
        done();
      });
  });
});