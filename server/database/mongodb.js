const mongoose = require('mongoose');

exports.connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      dbName: process.env.MONGO_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};
