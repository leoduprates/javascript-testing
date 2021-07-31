const faker = require('faker');
const puppeteer = require('puppeteer');
const server = require('../helpers/server');

const config = require('../configs/config.json');
const pageobject = require('../pageobjects/cardsPage.json');

describe('card', () => {
  const URL = config.URL;

  let browser, page;

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(URL);
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should create a new card', async () => {
    const card = {
      title: faker.lorem.words(2),
      description: faker.lorem.words(6)
    }

    await page.click(pageobject.Add);
    await page.type(pageobject.Title, card.title);
    await page.type(pageobject.Description, card.description);
    await page.click(pageobject.Save);
    await page.screenshot({ path: 'example.png' });
  });
});