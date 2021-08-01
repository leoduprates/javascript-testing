const mongoose = require('mongoose');
const sinon = require('sinon');
const cardsController = require('../../src/controllers/cardsController');
const CardsModel = require('../../src/models/cardsModel');

describe('cards controller - update', () => {
  let req;
  let res;
  let card;

  beforeEach(async () => {
    card = new CardsModel({
      title: 'Title value updated',
      description: 'Description value updated',
    });

    req = {
      params: {
        id: '61014b1134851b9203900c6e',
      },
      body: {
        title: 'Title value updated',
        description: 'Description value updated',
      },
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

  it('should return status error 400 if body is empty', async () => {
    req = { body: null };

    await cardsController.update(req, res);

    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWithMatch(res.send, {
      message: 'data to update cannot be empty',
    });
  });

  it('should find the card if the id is available in query parameters', async () => {
    sinon.stub(CardsModel, 'findByIdAndUpdate').returns(card);

    await cardsController.update(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWithMatch(res.send, card);
  });

  it('should return status error 404 if not found a document with related id', async () => {
    sinon.stub(mongoose.Model, 'findByIdAndUpdate').returns();

    await cardsController.update(req, res);

    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWithMatch(res.send, {
      message: 'cannot update card with 61014b1134851b9203900c6e',
    });
  });

  it('should return status error 500 if received a bad request', async () => {
    sinon
      .stub(mongoose.Model, 'findByIdAndUpdate')
      .throws(new Error("Cannot read property 'id' of undefined"));

    await cardsController.update(req, res);

    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWithMatch(res.send, {
      message: "Cannot read property 'id' of undefined",
    });
  });

  it('should return status error 500 if throws an error without a message', async () => {
    sinon.stub(mongoose.Model, 'findByIdAndUpdate').throws(new Error());

    await cardsController.update(req, res);

    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWithMatch(res.send, {
      message: 'error update card information',
    });
  });
});
