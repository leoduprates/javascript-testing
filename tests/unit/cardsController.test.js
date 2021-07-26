const cardsController = require('../../server/controllers/cardsController');
const cardsModel = require('../../server/models/cardsModel');
const sinon = require('sinon');

describe('cards controller', () => {
  let req, res;

  beforeEach(async () => {
    cardsModel.prototype.save = sinon.stub();
    cardsModel.prototype.save.returns();

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

  it('should return status 200 if all conditions are valid', async () => {
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
    req = {
      body: null,
    };

    await cardsController.create(req, res);

    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.send, {
      message: 'body content cannot be empity',
    });
  });

  it('should return status 500 when mongodb return an error with message', async () => {
    const mongoErrorMock = new Error('Mock Error');

    cardsModel.prototype.save = sinon.stub();
    cardsModel.prototype.save.throws(mongoErrorMock);

    await cardsController.create(req, res);

    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.send, { message: 'Mock Error' });
  });

  it('should return status 500 with default error message when mongodb return an error without message', async () => {
    const mongoErrorMock = new Error();

    cardsModel.prototype.save = sinon.stub();
    cardsModel.prototype.save.throws(mongoErrorMock);

    await cardsController.create(req, res);

    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.send, {
      message: 'some error ocurred while creating a operation',
    });
  });
});
