const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../../../src/server/server');
const mongoose = require('mongoose');

let app, mongodb;

exports.start = async () => {
  mongodb = await MongoMemoryServer.create();
  const URI = mongodb.getUri();

  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  app = server.listen(3000);
}

exports.stop = async () => {
  await app.close();
  await mongoose.disconnect();
  await mongodb.stop()
}