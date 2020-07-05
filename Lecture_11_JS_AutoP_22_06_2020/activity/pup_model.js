let ppt=require("puppeteer");
let {email,password}=require("../../credientals.json");
(async function(){
    let browser=await ppt.launch({
        headless:false,
        // slowMo:100,
        defaultViewport:null,
        args:["--start-maximized"]
    });
    let pkaArray=await browser.pages();
    let page=pkaArray[0];
    await page.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    await page.type("#input-1",email);
    await page.type("#input-2",password);
    // await page.click("button[data-analytics='LoginPassword']");
    // let val=await page.$("a[data-analytics='NavBarProfileDropDown']");
    // console.log("the value recevied after login",val);
    // await page.goto("https://www.hackerrank.com/administration/contests");
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click("button[data-analytics='LoginPassword']"),
    ]);
    await page.waitForSelector("a[data-analytics='NavBarProfileDropDown']",{visible:true});
    await page.click("a[data-analytics='NavBarProfileDropDown']");
    await page.waitForSelector("a[data-analytics='NavBarProfileDropDownAdministration']",{visible:true});
    await Promise.all([
        page.waitForNavigation({waitUntil:"networkidle0"}),
        page.click("a[data-analytics='NavBarProfileDropDownAdministration']")
    ])
    await page.waitForSelector("a[href='/administration/challenges']");
    await Promise.all([
        page.waitForNavigation({waitUntil:"networkidle0"}),
        page.click("a[href='/administration/challenges']")
    ])
    await handleSinglePage(page,browser);
})();

async function handleSinglePage(page,browser){

    //to find the number of pages
    await page.waitForSelector("a[data-attr1='Last']");
    let lastPageUrl=await page.$("a[data-attr1='Last']");
    let urlOfLastPageQues=await page.evaluate(function(ele){
        return ele.getAttribute("href");
    },lastPageUrl);
    console.log(urlOfLastPageQues);
    let num=urlOfLastPageQues.charAt(urlOfLastPageQues.length-1);
    console.log(num);


    let hrefPArr=[];
    for(let i=1;i<=num;i++){
        await page.waitForSelector("a.backbone.block-center");
        let allchallenges=await page.$$("a.backbone.block-center");
        for(let i=0;i<allchallenges.length;i++){
            let hrefP=page.evaluate(function(elem){
                return elem.getAttribute("href");
            },allchallenges[i]);
            hrefPArr.push(hrefP);
        }
        console.log(hrefPArr.length);
        await page.waitForSelector(".pagination ul li");
        let allLi=await page.$$(".pagination ul li");
        let liAttr=await page.evaluate(function(ele){
            return ele.getAttribute("class")
        },allLi[4])
        console.log("Value of li attribute is",liAttr);
        if(liAttr!="disabled"){
            await page.waitForSelector("a[data-attr1='Right']");
            await Promise.all([
                page.waitForNavigation({waitUntil:"networkidle0"}),
                page.click("a[data-attr1='Right']")
            ])
            console.log("Button clicked");
        }
    }
    let allHref=await Promise.all(hrefPArr);
    //console.log(hrefPArr);
    console.log(allHref);
    let paralleltaskP=[];
    //parallely add moderator for one page
    for(let i=0;i<allHref.length;i++){
        let newTab=await browser.newPage();
        let p=solveSingleQs(newTab,`https://www.hackerrank.com${allHref[i]}`);
        //console.log(p);
        paralleltaskP.push(p);
    }
    await Promise.all(paralleltaskP);
}

async function solveSingleQs(newTab,link){
    await newTab.goto(link,{waitUntil:"networkidle0"});
    await newTab.waitForSelector("a.cursor.change-tab.cep");
    let allAnchorTabs=await newTab.$$("a.cursor.change-tab.cep");
    await allAnchorTabs[1].click();
    await newTab.waitForSelector("#moderator");
    await newTab.type("#moderator","Manik");
    await newTab.keyboard.press('Enter');
    await newTab.waitForSelector(".save-challenge.btn.btn-green");
    await newTab.click(".save-challenge.btn.btn-green");
    //console.log("Moderator added successfully");
}

