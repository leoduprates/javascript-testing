const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config({ path: '../.env.test' });

const startMongoMock = async () => {
  await MongoMemoryServer.create({ instance: { port: 27017 } });
};

startMongoMock();
