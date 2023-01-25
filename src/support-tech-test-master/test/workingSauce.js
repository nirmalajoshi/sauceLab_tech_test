
const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver')
const SauceLabs = require('saucelabs').default;
const assert = require('assert');
const utils = require('./utils')

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

//const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.saucelabs.com:443/wd/hub`;

// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)

 const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

/**
* Task I: Update the test code so when it runs, the test clicks the "I am a link" link.
*
* Task II - Comment out the code from Task I. Update the test code so when it runs, 
* the test is able to write "Sauce" in the text box that currently says "I has no focus".
*
* Task III - Update the test code so when it runs, it adds an email to the email field, 
* adds text to the comments field, and clicks the "Send" button.
* Note that email will not actually be sent!
*
* Task IV - Add a capability that adds a tag to each test that is run.
* See this page for instructions: https://docs.saucelabs.com/dev/test-configuration-options/
* 
* Task V: Set the status of the test so it shows as "passed" instead of "complete".

* We've included the node-saucelabs package already. For more info see:
* https://github.com/saucelabs/node-saucelabs
*/

describe('Working Sauce', function () {
    it('should go to Google and click Sauce', async function () {
        let driver = await new Builder().withCapabilities(utils.workingCapabilities)
                    .usingServer(ONDEMAND_URL).build();


    /**
     * Goes to Sauce Lab's guinea-pig page and verifies the title
     */

    await driver.get("https://saucelabs.com/test/guinea-pig");
    await assert.strictEqual("I am a page title - Sauce Labs", await driver.getTitle());

/**
    * Task I: Update the test code so when it runs, the test clicks the "I am a link" link.
    * Reference doc : https://saucelabs.com/blog/the-selenium-click-command

    var clickable = await driver.findElement(By.id("i am a link"));         // find right element ByID from page
    console.log(clickable);                                                 //logging the ID to a console
    await clickable.click();                                                // wait till it clicks on Link
*/
  


/**
    * Task II - the test is able to write "Sauce" in the text box that currently says "I has no focus".
    * Reference doc :  https://www.selenium.dev/documentation/webdriver/getting_started/first_script/

    await driver.findElement(By.id("i_am_a_textbox")).clear();
    await driver.findElement(By.id("i_am_a_textbox")).sendKeys("Sauce");
 */


/** 
    Task III - add an email to the email field,  adds text to the comments field, 
        and clicks the "Send" button. Note that email will not actually be sent!
    Reference Doc: 
    https://www.selenium.dev/documentation/webdriver/getting_started/first_script/
    https://docs.saucelabs.com/mobile-apps/automated-testing/appium/configuration/#best-practices-for-identifying-application-elements
     
        var clickable = await driver.findElement(By.id("submit"));                        // Find Id of Send Button

        await driver.findElement(By.id("fbemail")).clear();                               // clear the email textbox
        await driver.findElement(By.id("fbemail")).sendKeys("jon.doe@gmail.com");         // Type in email address in the email  textbox
        
        await driver.findElement(By.id("comments")).clear();                                // clear the comment textbox
        await driver.findElement(By.id("comments")).sendKeys("Dummy Comment for Sauce Testing");    // // add the comment to textbox 

        await clickable.click();                                                     // Click on Send button
        
*/ 


/** 
    * Task IV - Add a capability that adds a tag to each test that is run.
    * Reference Doc: https://docs.saucelabs.com/basics/test-config-annotation/test-annotation/

    // added tags to utils.js file -  'tags': ["Interview", "sauceLab", "SupportDepartment"]

*/      



/** 

     Task V - Set the status of the test so it shows as "passed" instead of "complete
     Reference Doc: 
     https://docs.saucelabs.com/test-results/test-status/
     https://github.com/saucelabs-training/demo-js/blob/main/nightwatch/webdriver/examples/update-sauce/tests/custom-commands/customSauceLabsEnd.js
*/ 	
        
    afterEach(async function () {
        if (driver) {
            // Send test result to Sauce Labs
            const result = this.currentTest.state == 'passed' ? 'passed' : 'failed';
            await driver.executeScript(`sauce:job-result=${result}`);

            // Close the browser & end session
            await driver.quit();
        }
    });

    });
});
