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