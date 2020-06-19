require("chromedriver");
let swd=require("selenium-webdriver");
let {email,password}=require("../../credientals.json");
let question=require('../activity/question');
let browser=new swd.Builder();

let tab=browser.forBrowser("chrome").build();
(async function(){
    try{
        await tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        await tab.manage().setTimeouts({
            implicit:10000
        });
        let inputBoxPromise=tab.findElement(swd.By.css("#input-1"));
        let passwordBoxPromise=tab.findElement(swd.By.css("#input-2"));
        let BeArr=await Promise.all([inputBoxPromise,passwordBoxPromise]);
        let inputBox=BeArr[0];
        let passwordBox=BeArr[1];
        let inputBoxWillBeFilledP=inputBox.sendKeys(email);
        let passwordBoxWillBeFilledP=passwordBox.sendKeys(password);
        await Promise.all([inputBoxWillBeFilledP,passwordBoxWillBeFilledP]);
        let loginElement=await tab.findElement(swd.By.css("button[data-analytics='LoginPassword']"));
        await loginElement.click();
        console.log("the login button is clicked");
        let dropDown=await tab.findElement(swd.By.css(".backbone.nav_link.js-dropdown-toggle.js-link.toggle-wrap"));
        // a[data-analytics='NavBarProfileDropDown']
        // .backbone.nav_link.js-dropdown-toggle.js-link.toggle-wrap
        //.dropdown.dropdown.dropdown-auth.profile-menu.cursor.theme-m-content
        await dropDown.click();
        console.log("the drop down button is clicked");
        let adminButton=await tab.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDownAdministration']"));
        await adminButton.click();
        console.log("Admin button is clicked");
        let manageChallenge=await tab.findElement(swd.By.css("a[href='/administration/challenges']"));
        let manageChallengeLink=manageChallenge.getAttribute("href");
        // manageChallenge.click();
        await tab.get(manageChallengeLink);
        console.log("Manage challenge link clicked");
        let createChallenge=await tab.findElement(swd.By.css("button[href='/administration/challenges/create']"));
        let createChallengeLink=await createChallenge.getAttribute(createChallenge);
        await tab.get(createChallengeLink);
        let challengeInputBoxP=await tab.findElement(swd.By.css("#input"));
        await challengeInputBoxP.sendKeys(question[0]["Challenge Name"]);
        let challengePreviewBoxP=await tab.findElement(swd.By.css("#preview"));
        await challengePreviewBoxP.sendKeys(question[0]["Description"]);
        let inputBoxArr=await tab.findElements(swd.By.css(".CodeMirror-scroll"));
        await inputBoxArr[0].sendKeys(question[0]["Problem Statement"]);
        await inputBoxArr[0].sendKeys(question[0]["Input Format"]);
        await inputBoxArr[0].sendKeys(question[0]["Constraints"]);
        await inputBoxArr[0].sendKeys(question[0]["Output Format"]);
        let tagsInputP=await tab.findElement(swd.By.css("#tags_tagsinput"));
        await tagsInputP.sendKeys(question[0]["Tags"]);
        let saveChangesButtonP=await tab.findElement(swd.By.css(".save-challenge.btn.btn-green"));
        await saveChangesButtonP.click();
    }
    catch(err){
        console.log(err);
    }
})()

