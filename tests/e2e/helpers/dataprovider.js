const axios = require('axios');
const config = require('../configs/config.json');

exports.createCard = async (card) => {
  const response = await axios.post(`${config.URL}/api/cards`, card);
  return response;
};
