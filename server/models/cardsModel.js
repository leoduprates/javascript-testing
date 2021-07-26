const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: String,
});

const cards = mongoose.model('cards', schema);

module.exports = cards;
