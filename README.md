This script uses [Puppeteer](https://pptr.dev/) to get multiple size screenshots from a list of URLs.

Install: `npm install`

Run:
- Add each URL as a new line in urls.txt
- Browser sizes can be edited in `screenshot.js`
- `npm run screenshot`
- Screenshots will be saved to the `/export` folder.

Requirements:
The script uses `puppeteer-core` in combination with your local Chrome browser installation. It looks for Chrome in the (osx) application folder. This setup allows .mp4 videos to work. When using the version of Chromium that comes bundled with puppeteer, .mp4 videos do not work.
