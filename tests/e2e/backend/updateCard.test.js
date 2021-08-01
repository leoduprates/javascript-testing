const axios = require('axios');
const config = require('../configs/config.json');
const dataprovider = require('../helpers/dataprovider');
const server = require('../helpers/server');

describe('PUT /api/cards', () => {
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

    const response = await axios.put(`${URL}/api/cards/${card.data._id}`, {
      title: 'Update title.',
      description: 'Update description.',
    });

    expect(response.status).toBe(200);
    expect(response.data._id).not.toBeNull();
    expect(response.data.title).toEqual('Update title.');
    expect(response.data.description).toEqual('Update description.');
  });

  it('should get 404 status error when no card with id sent', async () => {
    await axios
      .put(`${URL}/api/cards/61014b1134851b9203900c6e`, {
        title: 'Update title.',
        description: 'Update description.',
      })
      .catch((error) => {
        expect(error.response.status).toBe(404);
        expect(error.response.data.message).toEqual(
          'cannot update card with 61014b1134851b9203900c6e',
        );
      });
  });
});
