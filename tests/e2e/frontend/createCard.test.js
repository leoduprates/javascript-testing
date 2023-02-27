const faker = require('faker');
const puppeteer = require('puppeteer');
const config = require('../configs/config.json');
const pageobject = require('./pageobjects/cardsPage.json');
const server = require('../helpers/server');

describe('create card', () => {
  let browser;
  let page;

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
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

  it('should create a new card', async () => {
    const card = {
      title: faker.lorem.words(2),
      description: faker.lorem.words(6),
    };

    await page.click(pageobject.Add);
    await page.type(pageobject.Form.Title, card.title);
    await page.type(pageobject.Form.Description, card.description);
    await page.click(pageobject.Form.Save);
    await page.waitForSelector(pageobject.Card.Self);

    const cardTitle = await page.$eval(pageobject.Card.Title, (element) => element.value);
    const cardDescription = await page.$eval(
      pageobject.Card.Description,
      (element) => element.value,
    );

    expect(cardTitle).toBe(card.title);
    expect(cardDescription).toBe(card.description);
  });
});
