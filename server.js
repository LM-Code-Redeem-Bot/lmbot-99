const express = require('express'),app = express();
const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');

app.get("/:id/:code", async (request, response) => {
    try {
        const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
        ignoreDefaultArgs: ['--disable-extensions'],
    });
    const page = await browser.newPage();
    await page.goto('https://lordsmobile.igg.com/gifts/');
    await page.type('#iggid', request.params.id)
    await page.type('#cdkey_1', request.params.code)
    await page.waitForSelector('#btn_claim_1');
    await page.click('#btn_claim_1',{delay: 300})
    const image = await page.screenshot({fullPage : true});
    await page.click('#btn_msg_close',{delay: 20})
    await browser.close();
    response.set('Content-Type', 'image/png');
    response.send(image);        
     return response.status(200).json;  
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (request, response) => {
     response.send('🔰 Hey Buddy.. 🚀 I am On...✔');  
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
