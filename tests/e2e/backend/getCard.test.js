const axios = require('axios');
const config = require('../configs/config.json');
const dataprovider = require('../helpers/dataprovider');
const server = require('../helpers/server');

describe('GET /api/cards', () => {
  const { URL } = config;

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should get the cards', async () => {
    await dataprovider.createCard({
      title: 'This is a title.',
      description: 'This is a description.',
    });

    const response = await axios.get(`${URL}/api/cards`);

    expect(response.status).toBe(200);
    expect(response.data[0]._id).not.toBeNull();
    expect(response.data[0].title).toEqual('This is a title.');
    expect(response.data[0].description).toEqual('This is a description.');
  });

  it('should get card by id', async () => {
    const card = await dataprovider.createCard({
      title: 'This is a title.',
      description: 'This is a description.',
    });

    const response = await axios.get(`${URL}/api/cards/${card.data._id}`);

    expect(response.status).toBe(200);
    expect(response.data._id).not.toBeNull();
    expect(response.data.title).toEqual('This is a title.');
    expect(response.data.description).toEqual('This is a description.');
  });

  it('should get 404 status error when no card with id sent', async () => {
    await axios.get(`${URL}/api/cards/61014b1134851b9203900c6e`).catch((error) => {
      expect(error.response.status).toBe(404);
      expect(error.response.data.message).toEqual(
        'not found the card with id 61014b1134851b9203900c6e',
      );
    });
  });

  it('should get 404 status error when no registered cards', async () => {
    await axios.get(`${URL}/api/cards`).catch((error) => {
      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toEqual(
        'error retrieving cards information',
      );
    });
  });
});
