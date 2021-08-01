const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const cardModel = require('../../src/models/cardsModel');
const server = require('../../src/server/server');

describe('/api/cards', () => {
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

  afterEach(async () => {
    await cardModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongodb.stop();
  });

  describe('POST /api/cards', () => {
    it('should create a new card', (done) => {
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
          done();
        });
    });

    it('should return 400 status error when body is empty', (done) => {
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
  });

  describe('GET /api/cards', () => {
    it('should get cards', (done) => {
      const card = cardModel({
        title: 'This is a title.',
        description: 'This is a description.',
      });
      card.save();

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

    it('should get card by id', (done) => {
      const card = cardModel({
        title: 'This is a title.',
        description: 'This is a description.',
      });
      card.save();

      request(server)
        .get(`/api/cards/${card._id}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body._id).not.toBeNull();
          expect(response.body.title).toEqual('This is a title.');
          expect(response.body.description).toEqual('This is a description.');
          done();
        });
    });

    it('should get 404 status error when no card with id sent', (done) => {
      request(server)
        .get('/api/cards/61014b1134851b9203900c6e')
        .then((response) => {
          expect(response.statusCode).toBe(404);
          expect(response.body.message).toEqual(
            'not found the card with id 61014b1134851b9203900c6e',
          );
          done();
        });
    });

    it('should get 404 status error when no registered cards', (done) => {
      request(server)
        .get('/api/cards')
        .then((response) => {
          expect(response.statusCode).toBe(404);
          expect(response.body.message).toEqual('error retrieving cards information');
          done();
        });
    });
  });

  describe('PUT /api/cards', () => {
    it('should update the card', (done) => {
      const card = cardModel({
        title: 'This is a title.',
        description: 'This is a description.',
      });
      card.save();

      request(server)
        .put(`/api/cards/${card._id}`)
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

    it('should get 404 status error when no card with id sent', (done) => {
      request(server)
        .put('/api/cards/61014b1134851b9203900c6e')
        .set('Accept', 'application/json')
        .send({
          title: 'Update title.',
          description: 'Update description.',
        })
        .then((response) => {
          expect(response.statusCode).toBe(404);
          expect(response.body.message).toEqual('cannot update card with 61014b1134851b9203900c6e');
          done();
        });
    });
  });

  describe('DELETE /api/cards', () => {
    it('should delete the card', (done) => {
      const card = cardModel({
        title: 'This is a title.',
        description: 'This is a description.',
      });
      card.save();

      request(server)
        .delete(`/api/cards/${card._id}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toEqual('card was deleted successfully');
          done();
        });
    });

    it('should get 404 status error when no card with id sent', (done) => {
      request(server)
        .delete('/api/cards/61014b1134851b9203900c6e')
        .then((response) => {
          expect(response.statusCode).toBe(404);
          expect(response.body.message).toEqual(
            'cannot delete card with id 61014b1134851b9203900c6e',
          );
          done();
        });
    });
  });
});
