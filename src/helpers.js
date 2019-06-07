export const e2eSelectorConverter = (selector) => {
  return `[data-e2e=${selector}]`;
};

export const click = async (page, selector) => {
  try {
    await page.waitForSelector(selector);
    await page.click(selector);
  } catch (e) {
    throw new Error(`Could not click on ${selector}.`);
  }
};

export const typeText = async (page, selector, text) => {
  try {
    await page.waitForSelector(selector);
    await page.type(selector, text);
  } catch (e) {
    throw new Error(`Could not type ${text} into ${selector}.`);
  }
};

export const loadUrl = async (page, url) => {
  await page.goto(url, {waitUntil: 'networkidle0'});
};

export const getText = async (page, selector) => {
  try {
    await page.waitForSelector(selector);
    return page.$eval(selector, e => e.innerHTML);
  } catch (e) {
    throw new Error(`Couldn't get text from ${selector}.`);
  }
};

// TODO: try to understand line by line.
export const getCount = async (page, selector) => {
  try {
    await page.waitForSelector(selector);
    return page.$$eval(selector, e => e.length);
  } catch (e) {
    throw new Error(`Cannot get count of selector: ${selector}`);
  }
};