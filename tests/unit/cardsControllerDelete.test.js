const mongoose = require('mongoose');
const sinon = require('sinon');
const cardsController = require('../../src/controllers/cardsController');
const CardsModel = require('../../src/models/cardsModel');

describe('cards controller - delete', () => {
  let req;
  let res;
  let card;

  beforeEach(async () => {
    card = new CardsModel({
      title: 'Title value',
      description: 'Description value',
    });

    req = {
      params: {
        id: '61014b1134851b9203900c6e',
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

  it('should delete the card', async () => {
    sinon.stub(CardsModel, 'findByIdAndDelete').returns(card);

    await cardsController.delete(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWithMatch(res.send, {
      message: 'card was deleted successfully',
    });
  });

  it('should return status error 404 if not found a document with related id', async () => {
    sinon.stub(CardsModel, 'findByIdAndDelete').returns();

    await cardsController.delete(req, res);

    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWithMatch(res.send, {
      message: 'cannot delete card with id 61014b1134851b9203900c6e',
    });
  });

  it('should return status error 500 if received a bad request', async () => {
    sinon.stub(mongoose.Model, 'findByIdAndDelete').returns();

    req = {
      params: undefined,
    };

    await cardsController.delete(req, res);

    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWithMatch(res.send, {
      message: "Cannot read property 'id' of undefined",
    });
  });

  it('should return status error 500 if throws an error without a message', async () => {
    sinon.stub(mongoose.Model, 'findByIdAndDelete').throws(new Error());

    await cardsController.delete(req, res);

    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWithMatch(res.send, { message: 'error delete card' });
  });
});
