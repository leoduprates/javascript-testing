const app = require('../../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const URI = mongod.getUri();

  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('/api/cards', () => {
  it('should post a new card', (done) => {
    request(app)
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
