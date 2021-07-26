const mongodb = require('./server/database/mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
const PORT = process.env.PORT || 8080;

const app = require('./app');

// start mongodb connection
mongodb.connection();

// start server
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
