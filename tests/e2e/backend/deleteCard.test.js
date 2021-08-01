const axios = require('axios');
const config = require('../configs/config.json');
const dataprovider = require('../helpers/dataprovider');
const server = require('../helpers/server');

describe('DELETE /api/cards', () => {
  const { URL } = config;

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should update the card', async () => {
    const card = await dataprovider.createCard({
      title: 'This is a title.',
      description: 'This is a description.',
    });

    const response = await axios.delete(`${URL}/api/cards/${card.data._id}`);

    expect(response.status).toBe(200);
    expect(response.data.message).toEqual('card was deleted successfully');
  });

  it('should get 404 status error when no card with id sent', async () => {
    await axios.delete(`${URL}/api/cards/61014b1134851b9203900c6e`).catch((error) => {
      expect(error.response.status).toBe(404);
      expect(error.response.data.message).toEqual(
        'cannot delete card with id 61014b1134851b9203900c6e',
      );
    });
  });
});
