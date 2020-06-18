require("chromedriver");
let swd=require("selenium-webdriver");
let {email,password}=require("../../credientals.json");
let browser=new swd.Builder();
//tab=>tab
let gCodeElements,gcInputBox,gTextArea;
let tab=browser.forBrowser("chrome").build();
let tabWillBeOpenPromise=tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
tabWillBeOpenPromise
.then(function (){
    //implicit timeout
    let findTimeOutP=tab.manage().setTimeouts({
        implicit:10000
    });
    return findTimeOutP;
})
.then(function(){
    //console.log("Login Page open");
    //to find an element
    let inputBoxPromise=tab.findElement(swd.By.css("#input-1"));
    let passwordBoxPromise=tab.findElement(swd.By.css("#input-2"));
    return Promise.all([inputBoxPromise,passwordBoxPromise]);
})
.then(function (BeArr){
    //enter data
    let inputBox=BeArr[0];
    let passwordBox=BeArr[1];
    let inputBoxWillBeFilledP=inputBox.sendKeys(email);
    let passwordBoxWillBeFilledP=passwordBox.sendKeys(password);
    return Promise.all([inputBoxWillBeFilledP,passwordBoxWillBeFilledP]);
})
.then(function(){
    console.log("Data entered");
})
// .then(function(){
//     let passwordBoxPromise=tab.findElement(swd.By.css("#input-2"));
//     return passwordBoxPromise;
// })
// .then(function(passwordBox){
//     let passwordBoxWillBeFilledP=passwordBox.sendKeys(password);
//     return passwordBoxWillBeFilledP;
// })
// .then(function(){
//     console.log("Password filled");
// })
.then(function(){
    let loginButtonPromise=tab.findElement(swd.By.css("button[data-analytics='LoginPassword']"));
    return loginButtonPromise;
})
.then(function(loginButton){
    let loginClick=loginButton.click();
    return loginClick;
})
.then(function(){
    console.log("The login button is clicked");
})
.then(function(){
    //  #base-card-22-link
    let IpKitPromise=tab.findElements(swd.By.css("h3[title='Interview Preparation Kit']"));
    return IpKitPromise;
})
.then(function(IpButton){
    let IpButton1=IpButton[0];
    let IpClick=IpButton1.click();
    return IpClick;
})
.then(function(){
    console.log("Ip button clicked successfully");
})
.then(function(){
    // a[data-analytics='PlaylistCardItem']
    //goto warmup challenges
    let warmUpPromise=tab.findElement(swd.By.css("a[data-attr1='warmup']"));
    return warmUpPromise;
})
.then(function(warmUpButton){
    let warmUpClick=warmUpButton.click();
    return warmUpClick;
})
.then(function(){
    console.log("The warm up button is clicked");
})
.then(function(){
    // let questionPromise=tab.findElement(swd.By.css(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary"));
    // return questionPromise;
    // let urlOfQP=tab.getCurrentUrl();
    // return urlOfQP;
    let allQtag=tab.findElements(swd.By.css("a.js-track-click.challenge-list-item"));
    return allQtag;
})
.then(function(allQues){
    let allQuesP=allQues.map(function(anchor){
        return anchor.getAttribute("href");
    })
    let allLinkPromise=Promise.all(allQuesP);
    return allLinkPromise;
})
.then(function(allQuesLink){
    let f1Promise=questionSolver(allQuesLink[0]);
    for(let i=1;i<allQuesLink.length;i++){
        f1Promise=f1Promise.then(function(){
            return questionSolver(allQuesLink[i]);
        })
    }
    let lstQuestWillBeSolvedP=f1Promise;
    return lstQuestWillBeSolvedP;
})
// .then(function(url){
//     console.log("The value of current url"+url);
// })
// .then(function(urlOfQP){
//     let questionWillBeSolvedPromise=questionSolver();
//     return questionWillBeSolvedPromise;
// })
.then(function(){
    //console.log("First Question is solved");
    console.log("All Question are solved");
})
.catch(function(err){
    console.log(err);
})

function questionSolver(url){
    return new Promise(function(resolve,reject){
        //logic to solve a question
        console.log("Inside question solver");
        let solutionQuestion;
        //let allWarmUpQuestionPromise=tab.findElements(swd.By.css(".challenge-submit-btn"));
        let allWarmUpQuestionPromise=tab.get(url);
        allWarmUpQuestionPromise.then(function(currentButtonArr){
           // console.log(currentButtonArr);
           let currentQuestionButtonPromise=currentButtonArr[0].click();
           return currentQuestionButtonPromise;
        })
        .then(function(){
            let editorWillBeSelectedPromise=tab.findElement(swd.By.css("a[data-attr2='Editorial']"));
            return editorWillBeSelectedPromise;
        })
        .then(function(editorBtn){
            let editorBtnWillBeClickedP=editorBtn.click();
            return editorBtnWillBeClickedP;
        })
        .then(function(){
            console.log("The editor button is clicked");
        })
        .then(function(){
            //check if there is lock btn then select it or find the solution
            let hlBtnP=handleLockBtn();
            return hlBtnP;
        })
        .then(function(){
            //get all lang code
            let cCodeWillBeCopiedP=copyCode();
            return cCodeWillBeCopiedP;
        })
        .then(function(code){
            let codeWillPastedP=pasteCode(code);
            return codeWillPastedP;
        })

        .then(function(){
            resolve();
        })
        .catch(function(err){
            console.log(err);
            reject(err);
        })
    })
}

function handleLockBtn(){
    return new Promise(function(resolve,reject){
        let lockBtnWillBeFP=tab.findElement(swd.By.css(".editorial-content-locked button.ui-btn.ui-btn-normal"));
        lockBtnWillBeFP
        .then(function(lockBtn){
            let lBtnWillBeCP=lockBtn.click();
            return lBtnWillBeCP;
        })
        .then(function(){
            resolve();
        })
        .catch(function(){
            console.log("Lock Button wasn't found");
            resolve();
        })
    })
}

function copyCode(){
    return new Promise(function (resolve,reject){
        //all langauage name
        let allLangElementP=tab.findElements(swd.By.css(".hackdown-content h3"));
        //get all the langauge code
        let allCodeElementP=tab.findElements(swd.By.css(".hackdown-content .highlight"));
        let bothArrayP=Promise.all([allLangElementP,allCodeElementP]);
        bothArrayP.then(function(bothArray){
            let langElements=bothArray[0];
            gCodeElements=bothArray[1];
            let allLangTextP=[];
            for(let i=0;i<langElements.length;i++){
                let cLangP=langElements[i].getText();
                allLangTextP.push(cLangP);
            }
            return Promise.all(allLangTextP);
        })
        .then(function(allLangs){
            let codeOfCP;
            for(let i=0;i<allLangs.length;i++){
                if(allLangs[i].includes("C++")){
                    codeOfCP=gCodeElements[i].getText();
                    break;
                }
            }
            return codeOfCP;
        })
        .then(function(code){
            console.log(code);
            resolve(code);
        })
        .catch(function(err){
            reject(err);
        })
    })
}

function pasteCode(code){
    return new Promise(function(resolve,reject){
        //click on promblem tab
        let problemTabWillBeSelectedP=tab.findElement(swd.By.css("li#Problem"));
        problemTabWillBeSelectedP
        .then(function(problemTab){
            let problemTabWillBeClickedP=problemTab.click();
            return problemTabWillBeClickedP;
        })
        .then(function(){
            console.log("Problem tab is clicked");
        })
        .then(function(){
            let inputBoxWillBeSelectedP=tab.findElement(swd.By.css(".custom-input-checkbox"));
            return inputBoxWillBeSelectedP;
        })
        .then(function(inputBox){
            let inputBoxClickP=inputBox.click();
            return inputBoxClickP;
        })
        .then(function(){
            console.log("CheckBox is clicked");
        })
        .then(function(){
            let cInputWillBeSelectedP=tab.findElement(swd.By.css(".custominput"));
            return cInputWillBeSelectedP;
        })
        .then(function(cInputBox){
            gcInputBox=cInputBox;
            let codeWillBeEnteredP=cInputBox.sendKeys(code);
            return codeWillBeEnteredP;
        })
        .then(function(){
            let ctrlAWillBeSendP=gcInputBox.sendKeys(swd.Key.CONTROL + "a");
            return ctrlAWillBeSendP;
        })
        .then(function(){
            let ctrlXWillBeSendP=gcInputBox.sendKeys(swd.Key.CONTROL+"x");
            return ctrlXWillBeSendP;
        })
        .then(function(){
            let textAreaP=tab.findElement(swd.By.css("textarea"));
            return textAreaP;
        })
        .then(function(textArea){
            gTextArea=textArea;
            let CodeWillBeP=textArea.sendKeys(swd.Key.CONTROL+"a");
            return CodeWillBeP;
        })
        .then(function(){
            let ctrlVWillBeSendP=gTextArea.sendKeys(swd.Key.CONTROL+"v");
            return ctrlVWillBeSendP;
        })
        .then(function(){
            let submitCodeBtnWillBeP=tab.findElement(swd.By.css("button.hr-monaco-submit"));
            return submitCodeBtnWillBeP;
        })
        .then(function(submitBtn){
            let submitBtnClickP=submitBtn.click();
            return submitBtnClickP;
        })
        .then(function(){
            resolve();
        })
        .catch(function(err){
            reject(err);
        })
    })
}







//Own practice Code

// .then(function(questionButton){
//     let questionClick=questionButton.click();
//     return questionClick;
// })
// .then(function(){
//     console.log("Question button clicked");
// })
// .then(function(){
//     let editorialQuestionPromise=tab.findElement(swd.By.css("a[data-analytics='ChallengeViewTab']"));
//     return editorialQuestionPromise;
// })
// .then(function(editorialButton){
//     let editorialClick=editorialButton.click();
//     return editorialClick;
// })
// .then(function(){
//     console.log("Editorial fuction clicked");
// })



//own practice code

// .then(function(){
//     let editorialPromise=tab.findElement(swd.By.css("#Editorial"));
//     return editorialPromise;
// })
// .then(function(editorailLink){
//     let editorialClick=editorailLink.click();
//     return editorialClick;
// })
// .then(function(){
//     console.log("The editorial link is clicked");
// })
// .then(function(){
//     let solutionButtonArrPromise=tab.findElements(swd.By.css(".ui-btn.ui-btn-normal.ui-btn-primary"));
//     return solutionButtonArrPromise;
// })
// .then(function(solutionButtonArr){
//     let solutionButton=solutionButtonArr[0].click();
//     return solutionButton;
// })
// .then(function(){
//     //console.log("Solution button pressed");
//     let solutionOfQuestionPromise=tab.findElements(swd.By.css(".highlight"));
//     return solutionOfQuestionPromise;
// })
// .catch(function(){
//     let solutionOfQuestionPromise=tab.findElements(swd.By.css(".highlight"));
//     return solutionOfQuestionPromise;
// })
// .then(function(solutionQuestionArr){
//     solutionQuestion=solutionQuestionArr[0].getText();
//     return solutionQuestion;
// })
// .then(function(solutionQuestion){
//     // console.log(solutionQuestion);
//     console.log("Solution is copied");
// })
// .then(function(){
//     let problemPagePromise=tab.findElement(swd.By.css("#Problem"));
//     return problemPagePromise;
// })
// .then(function(problemPageButton){
//     let problemPageClick=problemPageButton.click();
//     return problemPageClick;
// })
// .then(function(){
//     let editorialAnsPromise=tab.findElement(swd.By.css(".inputarea"));
//     return editorialAnsPromise;
// })
// // .then(function(inputAreaArr){
// //     let editorialArea=inputAreaArr[1];
// // })
// // .then(function(){
// //     console.log("The editor is called");
// // })
// .then(function(editorialAns){
//     console.log(solutionQuestion);
//     let ansCopiedEditor=editorialAns.sendKeys(solutionQuestion);
//     return ansCopiedEditor;
// })
// .then(function(){
//     console.log("Answer copied successfully");
// })
// .then(function(){
//     console.log("The function is working");
// })