const mongoose = require('mongoose');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

describe('mongodb connection', () => {
  beforeEach(() => {
    sinon.stub.mongoose = {};
    mongodb = proxyquire('../../server/database/mongodb', {
      mongoose: sinon.stub.mongoose,
    });

    sinon.stub.mongoose.connect = sinon.stub();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  it('should connection ready state equal 1 (connected)', async () => {
    process.env.MONGO_URI = 'mongodb://localhost:27017';
    sinon.stub.mongoose.connection = {
      readyState: 1
    };

    await mongodb.connection();
    expect(mongoose.connection.readyState).toBe(1);
  });

  it('should not connection with mongodb and throw an error', async () => {
    process.env.MONGO_URI = '';
    await expect(mongodb.connection()).rejects.toThrow(Error);
  });
});
