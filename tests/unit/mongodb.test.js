const mongoose = require('mongoose');
const sinon = require('sinon');
const mongodb = require('../../src/database/mongodb');

describe('mongodb connection', () => {
  let mongooseStub;

  beforeEach(() => {
    mongooseStub = sinon.stub(mongoose, 'connect');
  });

  afterEach(async () => {
    sinon.restore();
  });

  it('should connection ready state equal 1 (connected)', async () => {
    mongoose.connection.readyState = 1;

    await mongodb.connection();
    expect(mongoose.connection.readyState).toBe(1);
  });

  it('should not connection with mongodb and throw an error', async () => {
    mongooseStub.throws(new Error());
    await expect(mongodb.connection()).rejects.toThrow(Error);
  });
});
