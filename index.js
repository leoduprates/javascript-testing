const mongodb = require('./src/database/mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: process.env.NODE_ENV === 'test' ? './tests/.env.test' : '.env' });
const PORT = process.env.PORT || 8080;

const server = require('./src/server/server');

// start mongodb connection
mongodb.connection();

// start server
server.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);