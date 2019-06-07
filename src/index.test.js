import puppeteer from 'puppeteer';
import {baseUrl, isHeadless, slowMo, isDevtools} from './config';
import {click, typeText, gotoUrl, isTextInSelector, pressKey, shouldExist } from './helpers';

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
    await gotoUrl(page, baseUrl);
    await shouldExist(page, '#nav-search');

    const url = await page.url();
    const title = await page.title();

    expect(url).toContain('dev');
    expect(title).toContain('DEV Community');
  });

  it('browser reload', async () => {
    await page.reload();
    await shouldExist(page, '#page-content');

    const url = await page.url();
    const title = await page.title();

    await isTextInSelector(page, 'body', 'WRITE A POST');
    expect(url).toContain('dev');
    expect(title).toContain('Community');
  });

  it('click method', async () => {
    await gotoUrl(page, baseUrl);
    await click(page, '#write-link');
    await shouldExist(page, '.registration-rainbow');
  });

  it('submit searchbox', async () => {
    await gotoUrl(page, baseUrl);
    await typeText(page, '#nav-search', 'Javascript');
    await pressKey(page, 'Enter');
    await shouldExist(page, '#articles-list');
  });
});