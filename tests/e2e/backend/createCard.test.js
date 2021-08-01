const axios = require('axios');
const config = require('../configs/config.json');
const server = require('../helpers/server');

describe('POST /api/cards', () => {
  const { URL } = config;

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should create a new card', async () => {
    const data = {
      title: 'This is a title.',
      description: 'This is a description.',
    };

    const response = await axios.post(`${URL}/api/cards`, data);

    expect(response.status).toBe(200);
    expect(response.data._id).not.toBeNull();
    expect(response.data.title).toEqual('This is a title.');
    expect(response.data.description).toEqual('This is a description.');
  });

  it('should return 400 status error when body is empty', async () => {
    const data = {};

    await axios.post(`${URL}/api/cards`, data).catch((error) => {
      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toEqual('body content cannot be empity');
    });
  });
});
