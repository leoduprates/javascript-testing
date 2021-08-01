const mongoose = require('mongoose');
const sinon = require('sinon');
const cardsController = require('../../src/controllers/cardsController');
const cardsModel = require('../../src/models/cardsModel');

describe('cards controller - render', () => {
  let req;
  let res;

  beforeEach(async () => {
    req = sinon.stub;

    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
      render: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render to index', async () => {
    sinon.stub(cardsModel, 'find').returns();

    await cardsController.render(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.called(res.render);
  });

  it('should return status 500 with default error message when mongodb return an error without message', async () => {
    sinon.stub(mongoose.Model, 'find').throws(new Error());

    await cardsController.render(req, res);

    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.send, {
      message: 'error retrieving cards information',
    });
  });
});
