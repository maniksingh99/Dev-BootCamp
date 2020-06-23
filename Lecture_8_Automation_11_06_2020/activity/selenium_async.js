require("chromedriver");
let swd=require("selenium-webdriver");
let {email,password}=require("../../credientals.json");
let question=require('../activity/question');
let browser=new swd.Builder();

let tab=browser.forBrowser("chrome").build();
(async function(){
    try{
        //login btn is clicked
        await login();
        console.log("User logged in");
        let navBar=await tab.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDown']"));
        await tab.wait(swd.until.elementIsVisible(navBar));
        await navBar.click();
        //other way of doing the above steps is
        // await tab.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDown']"));
        // await tab.get("https://www.hackerrank.com/administration/contests");
        let adminBtn=await tab.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDownAdministration']"));
        await tab.wait(swd.until.elementIsVisible(adminBtn));
        await adminBtn.click();
        await waitloader();
        let manageChallengeBtn=await tab.findElement(swd.By.css("a[href='/administration/challenges']"));
        await manageChallengeBtn.click();
        let manageChallengeLink=await tab.getCurrentUrl()
        for(let i=0;i<question.length;i++){
            await tab.get(manageChallengeLink);
            await waitloader();
            await questionSolver(question[i]);
        }
    }
    catch(err){
        console.log(err);
    }
})()

async function login(){
    try{
        await tab.manage().window().maximize();
        await tab.manage().setTimeouts({
            implicit:10000
        });
        await tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
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
    }
    catch(err){
        console.log(err);
    }

}

async function questionSolver(question){
    let createChallengeBtn=await tab.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"));
    await createChallengeBtn.click();
    let challengeName=await tab.findElement(swd.By.css("#name"));
    let description=await tab.findElement(swd.By.css("#preview"));
    let problemStat=await tab.findElement(swd.By.css("#problem_statement-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let inputFormat=await tab.findElement(swd.By.css("#input_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let constraints=await tab.findElement(swd.By.css("#constraints-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let outputFormat=await tab.findElement(swd.By.css("#output_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let tags=await tab.findElement(swd.By.css(".tagsinput input"));
    await challengeName.sendKeys(question["Challenge Name"]);
    await description.sendKeys(question["Description"]);
    await sendData('#problem_statement-container',problemStat,question["Problem Statement"]);
    await sendData('#input_format-container',inputFormat,question["Input Format"]);
    await sendData("#constraints-container",constraints,question["Constraints"]);
    await sendData("#output_format-container",outputFormat,question["Output Format"]);
    await tags.sendKeys(question["Tags"]);
    await tags.sendKeys(swd.Key.ENTER);
    let saveBtn = await tab.findElement(swd.By.css("button.save-challenge.btn.btn-green"));
    await saveBtn.click();

}

async function waitloader(){
    let loader=await tab.findElement(swd.By.css("#ajax-msg"));
    await tab.wait(swd.until.elementIsNotVisible(loader));
}

async function sendData(parentId,element,data){
    //Selenium=>browser=>JS Execute
    console.log("The send data function is called");
    await tab.executeScript(`document.querySelector('${parentId} .CodeMirror.cm-s-default.CodeMirror-wrap div').style.height='10px'`);
    await element.sendKeys(data);
}

