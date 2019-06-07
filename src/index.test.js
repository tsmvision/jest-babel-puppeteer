import puppeteer from 'puppeteer';
import { baseUrl, isHeadless, slowMo, isDevtools } from './config';
import { click } from './helpers';

describe('My first puppeteer test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: isHeadless,
      slowMo: slowMo,
      devtools: isDevtools,
      timeout: 10000,
    });
    page = await browser.newPage();
    await page.setViewport({
      width: 1024,
      height: 768
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('my first test step', async () => {
    await page.goto('http://dev.to/');
    await page.waitForSelector('#nav-search');

    const url = await page.url();
    const title = await page.title();

    expect(url).toContain('dev');
    expect(title).toContain('DEV Community');
  });

  it('browser reload', async () => {
    await page.reload();
    await page.waitForSelector('#page-content');

    const url = await page.url();
    const title = await page.title();

    expect(url).toContain('dev');
    expect(title).toContain('Community');
  });

  it('click method', async () => {
    await page.goto('http://dev.to/');
    await click(page, '#write-link');
    await page.waitForSelector('.registration-rainbow');
  });

  it('submit searchbox', async () => {
    await page.goto('https://dev.to/');
    await page.waitForSelector('#nav-search');
    await page.type('#nav-search', "Javascript");
    await page.keyboard.press('Enter');
    await page.waitForSelector('#articles-list');
  });
});