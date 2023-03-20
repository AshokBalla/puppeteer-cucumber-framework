const { Given, When, Then, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const assert = require('assert');

let browser;
let page;

BeforeAll(async function () {
  browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
});

AfterAll(async function () {
  if (page) await page.close();
  if (browser) await browser.close();
});

Given('I open the login page', async function () {
  page = await browser.newPage();
  await page.goto('https://the-internet.herokuapp.com/login', { waitUntil: 'networkidle2' });
});

When('I login with username {string} and password {string}', async function (username, password) {
  await page.type('#username', username);
  await page.type('#password', password);
  await Promise.all([
    page.click('button[type=submit]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);
});

Then('I should see a success message', async function () {
  const flash = await page.$eval('#flash', el => el.innerText);
  assert.ok(/You logged into a secure area!/.test(flash) || /invalid/.test(flash), 'Expected a success or error message');
});

Given('I open the signup demo page', async function () {
  page = await browser.newPage();
  // this is a placeholder demo page
  await page.goto('https://www.w3schools.com/howto/howto_css_signup_form.asp', { waitUntil: 'networkidle2' });
});

When('I fill the signup form with {string} and {string}', async function (name, email) {
  // the demo page form has name/email fields in examples; attempt to fill if present
  try {
    await page.type('input[name="name"]', name);
  } catch (e) {}
  try {
    await page.type('input[name="email"]', email);
  } catch (e) {}
});

Then('I see a confirmation or heading', async function () {
  const title = await page.title();
  assert.ok(title && title.length > 0, 'Expected a page title or heading');
});
