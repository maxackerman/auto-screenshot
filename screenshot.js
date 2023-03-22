const puppeteer = require('puppeteer-core');
const fs = require('fs');
const urls = fs.readFileSync('urls.txt').toString().split("\n");

const sizes = [
  { name: 'iphone',
    width: 375,
    height: 667
  },
  {
    name: 'desktop',
    width: 1440,
    height: 900
  }
]

let count = 1;

async function getUrlSizes(devices, urls) {
  for (let url of urls) {
    for (let size of sizes) {
      console.log(`${size.name}: ${url}`)
      try{
        await getScreenShot(url, size);
      }catch(e){
        await console.error(`Error with ${url}`, e);
      }
    }
    count++
  }
}
getUrlSizes(sizes, urls);

async function getScreenShot(url, size){
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
    headless: true
  });

  const page = await browser.newPage();
    await page.setViewport({
    width: size.width,
    height: size.height,
    deviceScaleFactor: 2,
  });

  await page.goto(url, {waitUntil: 'networkidle2'}); // can also try networkidle0

  // Delay for page to lazy load stuff - combine this with "headless: false" to click away modals
  await page.waitForTimeout(2000);

  // For full page length screenshot, reset browser height to page height
  // OR use fullPage option below
  // const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  // await page.setViewport({
  //   width: size.width,
  //   height: bodyHeight,
  //   deviceScaleFactor: 2
  // })

  const thisURL = new URL(page.url()).hostname;
  const fileName = `${thisURL}-${size.width}_${count.toString().padStart(2, '0')}`;
  await page.screenshot({
    path: `export/${fileName}.png`,
    fullPage: true
  });

  await browser.close();
}
