const mongoose = require('mongoose');
const sinon = require('sinon');
const cardsController = require('../../src/controllers/cardsController');
const CardsModel = require('../../src/models/cardsModel');

describe('cards controller - find', () => {
  let req;
  let res;
  let card;

  beforeEach(async () => {
    card = new CardsModel({
      title: 'Title value',
      description: 'Description value',
    });

    req = {
      params: {},
    };

    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      send: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should find all cards if the id was not available in parameters', async () => {
    sinon.stub(mongoose.Model, 'find').returns(card);

    await cardsController.find(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWithMatch(res.send, {
      title: 'Title value',
      description: 'Description value',
    });
  });

  it('should find the card if the id is available in parameters', async () => {
    sinon.stub(mongoose.Model, 'findOne').returns(card);

    req = {
      params: {
        id: '61014b1134851b9203900c6e',
      },
    };

    await cardsController.find(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWithMatch(res.send, {
      title: 'Title value',
      description: 'Description value',
    });
  });

  it('should return status error 404 if not found a document with related id', async () => {
    sinon.stub(mongoose.Model, 'findOne').returns();

    req = {
      params: {
        id: '61014b1134851b9203900c6e',
      },
    };

    await cardsController.find(req, res);

    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWithMatch(res.send, {
      message: 'not found the card with id 61014b1134851b9203900c6e',
    });
  });

  it('should return status error 500 if not found documents', async () => {
    sinon.stub(mongoose.Model, 'find').returns();

    await cardsController.find(req, res);

    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWithMatch(res.send, {
      message: "Cannot read properties of undefined (reading 'length')",
    });
  });
});
