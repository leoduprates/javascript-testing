const faker = require('faker');
const puppeteer = require('puppeteer');
const dataprovider = require('../helpers/dataprovider');
const config = require('../configs/config.json');
const pageobject = require('./pageobjects/cardsPage.json');
const server = require('../helpers/server');

describe('update card', () => {
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

  it('should update the card', async () => {
    const card = {
      title: faker.lorem.words(2),
      description: faker.lorem.words(6),
    };

    await page.$eval(pageobject.Card.Title, (element) => {
      element.value = '';
    });
    await page.$eval(pageobject.Card.Description, (element) => {
      element.value = '';
    });
    await page.type(pageobject.Card.Title, card.title);
    await page.type(pageobject.Card.Description, card.description);
    await page.click(pageobject.Card.Update);
    await page.waitForSelector(pageobject.Card.Self);

    const cardTitle = await page.$eval(pageobject.Card.Title, (element) => element.value);
    const cardDescription = await page.$eval(
      pageobject.Card.Description,
      (element) => element.value,
    );

    expect(cardTitle).toBe(card.title);
    expect(cardDescription).toBe(card.description);

    // await page.screenshot({ path: 'example.png' });
  });
});
