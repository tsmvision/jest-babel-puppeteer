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
    throw new Error(`Could not type ${text} into ${selector}`);
  }
};

export const loadUrl = async (page, url) => {
  await page.goto(url, {waitUntil: 'networkidle0'});
};