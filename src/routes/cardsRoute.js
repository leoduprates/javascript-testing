const cardsController = require('../controllers/cardsController');
const express = require('express');
const route = express.Router();

route.delete('/api/cards/:id', cardsController.delete);
route.get('/', cardsController.render);
route.get('/api/cards', cardsController.find);
route.get('/api/cards/:id', cardsController.find);
route.post('/api/cards', cardsController.create);
route.put('/api/cards/:id', cardsController.update);

module.exports = route;
