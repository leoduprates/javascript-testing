const dotenv = require('dotenv');
const mongodb = require('./src/database/mongodb');

dotenv.config({ path: process.env.NODE_ENV === 'test' ? './tests/.env.test' : '.env' });
const PORT = process.env.PORT || 8080;

const server = require('./src/server/server');

mongodb.connection();
server.listen(PORT);
