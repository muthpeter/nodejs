const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
    await page.goto('https://www.binance.com/en/markets');

    const element = await page.$x('/html/body/div[1]/div[1]/main/div/div[1]/div/div[1]/a/div[2]/div[1]');
    const textObject = await element[0].getProperty('textContent');
    text = textObject._remoteObject.value;
    console.log(text);



  await browser.close();



})();

