const sinon = require('sinon');
const cardsController = require('../../src/controllers/cardsController');
const cardsModel = require('../../src/models/cardsModel');

describe('cards controller - create', () => {
  let req;
  let res;

  beforeEach(async () => {
    req = {
      body: {},
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

  it('should create a card if all conditions are valid', async () => {
    sinon.stub(cardsModel.prototype, 'save').returns();

    req = {
      body: {
        title: 'Title value',
        description: 'Description value',
      },
    };

    await cardsController.create(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWithMatch(res.send, {
      title: 'Title value',
      description: 'Description value',
    });
  });

  it('should return status 400 when body is empity', async () => {
    sinon.stub(cardsModel.prototype, 'save').returns();

    req = {
      body: {},
    };

    await cardsController.create(req, res);

    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.send, {
      message: 'body content cannot be empity',
    });
  });

  it('should return status 500 when mongodb return an error with message', async () => {
    sinon.stub(cardsModel.prototype, 'save').throws(new Error('Mock Error'));

    req = {
      body: {
        title: 'Title value',
        description: 'Description value',
      },
    };

    await cardsController.create(req, res);

    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.send, { message: 'Mock Error' });
  });

  it('should return status 500 with default error message when mongodb return an error without message', async () => {
    sinon.stub(cardsModel.prototype, 'save').throws(new Error());

    req = {
      body: {
        title: 'Title value',
        description: 'Description value',
      },
    };

    await cardsController.create(req, res);

    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.send, {
      message: 'some error ocurred while creating a operation',
    });
  });
});
