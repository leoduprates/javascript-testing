const server = require('../../src/server/server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');

let mongodb;

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

describe('/api/cards', () => {
  it('should post a new card', (done) => {
    request(server)
      .post('/api/cards')
      .set('Accept', 'application/json')
      .send({
        title: 'This is a title.',
        description: 'This is a description.',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).not.toBeNull();
        expect(response.body.title).toEqual('This is a title.');
        expect(response.body.description).toEqual('This is a description.');
        done();
      });
  });
});
