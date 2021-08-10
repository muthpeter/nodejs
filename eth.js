const puppeteer = require('puppeteer');


function geteth() {(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
    await page.goto('https://www.binance.com/en/markets');

    const element = await page.$x('/html/body/div[1]/div[1]/main/div/div[1]/div/div[2]/a/div[2]/div[2]');
    const textObject = await element[0].getProperty('textContent');
    const text = textObject._remoteObject.value;
    console.log(text);



  await browser.close();



})();}

module.exports = geteth();

