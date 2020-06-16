require("chromedriver");
let swd=require("selenium-webdriver");
let browser=new swd.Builder();
let {email,password} =require("../../credientals.json");
//tab=>tab
let tab=browser.forBrowser("chrome").build();

(async function(){
    try{
        await tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        
    }
    catch(err){

    }
})()