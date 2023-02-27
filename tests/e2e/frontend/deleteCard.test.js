const puppeteer = require('puppeteer');
const dataprovider = require('../helpers/dataprovider');
const config = require('../configs/config.json');
const pageobject = require('./pageobjects/cardsPage.json');
const server = require('../helpers/server');

describe('delete card', () => {
  let browser;
  let page;

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    await dataprovider.createCard({
      title: 'This is a title.',
      description: 'This is a description.',
    });
    browser = await puppeteer.launch(
      {
        executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox' ]
      }
    );
    page = await browser.newPage();
    await page.goto(config.URL);
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should delete the card', async () => {
    await page.click(pageobject.Card.Delete);
    const cardExists = !((await page.$(pageobject.Card.Self)) == null);
    expect(cardExists).toBeFalsy();
  });
});
