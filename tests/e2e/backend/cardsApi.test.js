const axios = require('axios')
const server = require('../helpers/server');

const config = require('../configs/config.json');

describe('shoult post a new card', () => {
  const URL = config.URL;

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should post the card', async () => {
    const data = {
      title: 'This is a title.',
      description: 'This is a description.',
    }

    const response = await axios.post(`${URL}/api/cards`, data);

    expect(response.status).toBe(200);
    expect(response.data._id).not.toBeNull();
    expect(response.data.title).toEqual('This is a title.');
    expect(response.data.description).toEqual('This is a description.');
  });
});