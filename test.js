const ScreenshotTester = require('puppeteer-screenshot-tester')
const puppeteer = require('puppeteer');
const rootUrl = ''
const login = ''
const password = ''


// Notes:
// comparison tool https://github.com/HuddleEng/Resemble.js 
// and https://github.com/burnpiro/puppeteer-screenshot-tester
// largeImageThreshold: 0
// About hoisting https://stackoverflow.com/questions/9085839/surprised-that-global-variable-has-undefined-value-in-javascript
// About IIFE https://codeburst.io/javascript-what-the-heck-is-an-immediately-invoked-function-expression-a0ed32b66c18


const test = async () => {
  const browser = await puppeteer.launch({
        headless: false,
        devtools: true
        //slowMo: 100
    });
  const page = await browser.newPage();
  page.setViewport({
      width: 1920,
    height: 1080
    });

   const tester = await ScreenshotTester(0, false, false, [], {
    errorColor: {
      red: 255,
      green: 0,
      blue: 255
    },
    errorType: 'flat',
    transparency: 0.8,
    largeImageThreshold: 0
  });
 
  await page.goto(rootUrl,{waitUntil: 'networkidle2', timeout: 60000});
  //const folder = 'screenshot';

  //login
  await page.type('[name="email"]',login)
  await page.type('[name="password"]',password)
  await page.screenshot({path: 'login.png'});
  const result = await tester(page, 'login_reference')
  console.log(result)


  //main page with map
  await page.click('[type="submit"]')
  await page.waitFor(5000)
  await page.screenshot({path: 'map.png'});
  
  //new request page
  await page.click('[id="new"]')
  await page.screenshot({path: 'request_upper_part.png', fullPage:true});
  await page.click('[name="drop_off_address.state"]')
  await page.screenshot({path: 'request_middle1.png', fullPage:true});
  await page.click('[name="beneficiary_email"]')
  await page.screenshot({path: 'request_middle2.png', fullPage:true});
  await page.click('[name="hub_contact_name"]')
  await page.screenshot({path: 'request_middle3.png', fullPage:true});
  await page.click('[name="contact_threshold_min"]')
  await page.screenshot({path: 'request_lower.png', fullPage:true});

  //service providers page
  await page.click('.icon-ic-service-providers')
  await page.waitFor(1000)
  await page.screenshot({path: 'service_providers.png', fullPage:true});

  //new provider
  await page.click('[id="new"]')
  await page.screenshot({path: 'service_provider_new_upper.png', fullPage:true});
  await page.click('.btn-wrap')
  await page.screenshot({path: 'service_provider_new_lower.png', fullPage:true});

  //hubs
  await page.goto(rootUrl+'configurations/hubs/',{waitUntil: 'networkidle2', timeout: 60000})
  await page.waitFor(1000)
  await page.screenshot({path: 'hubs.png', fullPage:true});
  await page.click('[id="new"]')
  await page.screenshot({path: 'new_hub_top.png', fullPage:true});
  await page.click('.btn-wrap')
  await page.screenshot({path: 'new_hub_bottom.png', fullPage:true});

  //zones
  await page.goto(rootUrl+'configurations/zones/',{waitUntil: 'networkidle2', timeout: 60000})
  await page.waitFor(1000)
  await page.screenshot({path: 'zones.png', fullPage:true});
  await page.click('[id="new"]')
  await page.waitFor(1000)
  await page.screenshot({path: 'new_zone.png', fullPage:true});

  //profile page

  // qualifiers
  await page.goto(rootUrl + 'configurations/qualifiers/',{waitUntil: 'networkidle2', timeout: 60000});
  await page.screenshot({path: 'qualifiers.png', fullPage:true});
  await page.click('[id="new"]')
  await page.click('.selectMenu')
  await page.click('[data-value="all"]')
  await page.screenshot({path: 'qualifier_select_menu.png', fullPage:true});
  await page.click('.icon-add-icon')
  await page.screenshot({path: 'qualifier_criteria_0.png', fullPage:true});
  await page.evaluate(() => {
        let buttons = document.querySelectorAll('[role="button"]');
        for (let button of buttons){
            button.click();
        }
    });
  await browser.close();
};

test();


  // great example of how you can be f***ed up by puppeteer.: await page.screenshot('example.png');