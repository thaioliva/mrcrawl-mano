require('dotenv-safe').load();
require('dotenv-safe').config({
  allowEmptyValues: true,
});

global.db = require('./config/mongo');
const puppeteer = require('puppeteer');

const site = [
  'http://workandcode.com/',
  'https://glitch.com/',
];


(site || []).map((site) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    puppeteer.launch().then(async browser => {
      await page.setRequestInterception(true);
      page.on('request', interceptedRequest => {
        if (interceptedRequest.url().endsWith('.js')
          && interceptedRequest.url().includes(process.env.FILE_NAME)) {
          // const res = execSQLQuery(`INSERT INTO log(site) VALUES(${site})`);
          // global.db.insert({ 'site': site, 'createdAt': new Date() });
          console.log(interceptedRequest.url());
          interceptedRequest.abort();
        } else interceptedRequest.continue();
      });
      await page.goto(site);
      await browser.close();
    });
  })();
});

