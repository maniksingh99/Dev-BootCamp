const $=require("jquery");
const fs=require("fs");
const dialog=require("electron").remote.dialog;

$(document).ready(function(){
    let db;
    let lsc;

    $(".cell-container").on("scroll",function(){
        let scrollY=$(this).scrollTop();
        let scrollX=$(this).scrollLeft();
        //console.log(scrollY);
        $("#top-row,#top-left-cell").css("top",scrollY+"px");
        $("#top-left-cell,#left-col").css("left",scrollX+"px");
    })

    $("#grid .cell").on("keyup",function(){
        let {rowId} = getrc(this);
        //console.log(rowId);
        let ht = $(this).height();
        //console.log("Value of height ",ht);
        $($("#left-col .cell")[rowId]).height(ht);
        //$("#left-col .cell").eq(rowId).height(ht);
    })

    //this function is used to select the option like file and home
    $(".menu").on("click",function(){
        let Id = $(this).attr("id");
        $(".menu-options").removeClass("selected");
        $(`#${Id}-menu-options`).addClass("selected");
    })

    let lcell;
    $("#grid .cell").on("click",function(){
        let {colId,rowId}=getrc(this);
        let value=String.fromCharCode(65+colId)+(rowId+1);
        $('#text-input').val(value);
        let cellObject = getCell(this);
        $("#formula-input").val(cellObject.formula);
        console.log(lcell);
        if( lcell && this!=lcell){
            console.log(lcell);
            $(lcell).removeClass("selected");
        }
        //agar idhar else hota tho fir ye tho if chala ga ya tho else but we want to simultaeously want to remove the selected class from one and add selected class to other
        // else{
        //     console.log("the else statement is excuted");
           
        // }
        $(this).addClass("selected");
        
        if(cellObject.bold){
            $("#bold").addClass("isOn");
        }else{
            $("#bold").removeClass("isOn");
        }
        if(cellObject.underline){
            $("#underline").addClass("isOn");
        }else{
            $("#underline").removeClass("isOn");
        }
        if(cellObject.italic){
            $("#italic").addClass("isOn");
        }
        else{
            $("#italic").removeClass("isOn");
        }
        if(cellObject.halign=='left'){
            $("input[halign='left']").addClass("isOn");
            $("input[halign='center']").removeClass("isOn");
            $("input[halign='right']").removeClass("isOn");
        }
        else if(cellObject.halign=='center'){
            $("input[halign='center']").addClass("isOn");
            $("input[halign='left']").removeClass("isOn");
            $("input[halign='right']").removeClass("isOn");
        }
        else if(cellObject.halign=='right'){
            $("input[halign='right']").addClass("isOn");
            $("input[halign='left']").removeClass("isOn");
            $("input[halign='center']").removeClass("isOn");
        }
        lcell=this;
    })

    $("#bold").on("click",function(){
        $(this).toggleClass("isOn");
        let isBold = $(this).hasClass("isOn");
        $("#grid .cell.selected").css("font-weight",isBold?"bolder":"normal");
        let cellElem = $("#grid .cell.selected");
        let cellObject = getCell(cellElem);
        cellObject.bold=isBold;
    })

    $("#underline").on("click",function(){
        $(this).toggleClass("isOn");
        let isUnderLine = $(this).hasClass("isOn");
        $("#grid .cell.selected").css("text-decoration",isUnderLine?"underline":"none");
        let cellElem = $("#grid .cell.selected");
        let cellObject = getCell(cellElem);
        cellObject.underline = isUnderLine;
    })

    $("#italic").on("click",function(){
        $(this).toggleClass("isOn");
        let isItalic = $(this).hasClass("isOn");
        $("#grid .cell.selected").css("font-style",isItalic?"italic":"normal");
        let cellElem = $("#grid .cell.selected");
        let cellObject=getCell(cellElem);
        cellObject.italic=isItalic;
    })

    $("#font-family").on("change",function(){
        let fontFamily=$(this).val();
        $("#grid .cell.selected").css("font-family",fontFamily);
        let cellElem = $("#grid .cell.selected");
        let cellObject = getCell(cellElem);
        cellObject.fontFamily=fontFamily;

    })

    $("#font-size").on("change",function(){
        let fontSize=$(this).val();
        $("#grid .cell.selected").css("font-size",fontSize+"px");
        let cellElem = $("#grid .cell.selected");
        let cellObject = getCell(cellElem);
        cellObject.fontSize=fontSize;
    })

    $("#bg-color").on("change",function(){
        let bgColor=$(this).val();
        let cellElem=$("#grid .cell.selected");
        cellElem.css("background-color",bgColor);
        let cellObject = getCell(cellElem);
        cellObject.bgColor=bgColor;
    })

    $("#text-color").on("change",function(){
        let textColor=$(this).val();
        let cellElem=$("#grid .cell.selected");
        cellElem.css("color",textColor);
        let cellObject = getCell(cellElem);
        cellObject.textColor=textColor;
    })

    $("input[halign='left']").on("click",function(){
        $(this).toggleClass("isOn");
        $("input[halign='center']").removeClass("isOn");
        $("input[halign='right']").removeClass("isOn");
        let leftAlign = $(this).hasClass("isOn");
        console.log(leftAlign);
        $("#grid .cell.selected").css("text-align",leftAlign?"left":"left");
        let cellElem = $("#grid .cell.selected");
        let cellObject = getCell(cellElem);
        if(leftAlign){
            cellObject.halign="left";
        }else{
            cellObject.halign="left";
        }
        // let cellElem=$('#grid .cell.selected');
        // cellElem.css("text-align",halign);
        // let cellObject = getCell(cellElem);
        // cellObject.halign=halign;
    })

    $("input[halign='center']").on("click",function(){
        $(this).toggleClass("isOn");
        $("input[halign='left']").removeClass("isOn");
        $("input[halign='right']").removeClass("isOn");
        let leftAlign = $(this).hasClass("isOn");
        $("#grid .cell.selected").css("text-align",leftAlign?"center":"left");
        let cellElem = $("#grid .cell.selected");
        let cellObject = getCell(cellElem);
        if(leftAlign){
            cellObject.halign="center";
        }else{
            cellObject.halign="left";
        }
        // let halign = $(this).val();
        // let cellElem=$('#grid .cell.selected');
        // cellElem.css("text-align",halign);
        // let cellObject = getCell(cellElem);
        // cellObject.halign=halign;
    })

    $("input[halign='right']").on("click",function(){
        $(this).toggleClass("isOn");
        $("input[halign='left']").removeClass("isOn");
        $("input[halign='center']").removeClass("isOn");
        let leftAlign = $(this).hasClass("isOn");
        $("#grid .cell.selected").css("text-align",leftAlign?"right":"left");
        let cellElem = $("#grid .cell.selected");
        let cellObject = getCell(cellElem);
        if(leftAlign){
            cellObject.halign="right";
        }else{
            cellObject.halign="left";
        }
        // let halign = $(this).val();
        // let cellElem=$('#grid .cell.selected');
        // cellElem.css("text-align",halign);
        // let cellObject = getCell(cellElem);
        // cellObject.halign=halign;
    })

    $("#New").on("click",function(){
        db=[];
        let allRows=$("#grid").find(".row");
        //console.log(allRows);
        for(let i=0;i<allRows.length;i++){
            let row=[];
            let allCols=$(allRows[i]).find(".cell");
            for(let j=0;j<allCols.length;j++){
                let cell={
                    value:"",
                    formula:"",
                    downstream:[],
                    upstream:[],
                    bold:false,
                    underline:false,
                    italic:false,
                    fontFamily:"Arial",
                    fontSize:12,
                    bgColor:"white",
                    textColor:"black",
                    halign:"left"
                }
                $(allCols[j]).html('');
                $(allCols[j]).css("font-weight", cell.bold ? "bolder" : "normal");
                $(allCols[j]).css("font-style", cell.italic ? "italic" : "normal");
                $(allCols[j]).css("text-decoration", cell.underline ? "underline" : "none");
                $(allCols[j]).css("font-family", cell.fontFamily);
                $(allCols[j]).css("font-size", cell.fontSize);
                $(allCols[j]).css("color", cell.textColor);
                $(allCols[j]).css("background-color", cell.bgColor);
                $(allCols[j]).css("text-align", cell.halign);
                row.push(cell);
            }
            db.push(row);
        }
        console.log(db);
        $("#grid .cell").eq(0).trigger("click");
        // let cellArr=$("#grid .cell");
        // $(cellArr[0]).trigger("click");
    })

    $("#Save").on("click",async function(){
        let sbd=await dialog.showOpenDialog();
        let fp=sbd.filePaths[0];
        if(fp==undefined){
            console.log("Please select file first");
            return;
        }
        let jsonData=JSON.stringify(db);
        fs.writeFileSync(fp,jsonData);
    })

    $("#Open").on("click",async function(){
        let sbd=await dialog.showOpenDialog();
        let fp=sbd.filePaths[0];
        if(fp==undefined){
            console.log("Please select file first");
            return;
        }
        let buffer=fs.readFileSync(fp);
        db=JSON.parse(buffer);
        let allRows=$("#grid").find(".row");
        for(let i=0;i<allRows.length;i++){
            let allCols=$(allRows[i]).find(".cell");
            for(let j=0;j<allCols.length;j++){
                $(`#grid .cell[row-id=${i}][col-id=${j}]`).html(db[i][j].value);
                $(allCols[j]).css("font-weight", cell.bold ? "bolder" : "normal");
                $(allCols[j]).css("font-style", cell.italic ? "italic" : "normal");
                $(allCols[j]).css("text-decoration", cell.underline ? "underline" : "none");
                $(allCols[j]).css("font-family", cell.fontFamily);
                $(allCols[j]).css("font-size", cell.fontSize);
                $(allCols[j]).css("color", cell.textColor);
                $(allCols[j]).css("background-color", cell.bgColor);
                $(allCols[j]).css("text-align", cell.halign);
            }
        }
    })

    //this is fullfilling two cases when value=>value and formula=> val
    $("#grid .cell").on("blur",function(){
        let {colId,rowId}=getrc(this);
        let cellObject=getCell(this);
        // db[rowId][colId].value=$(this).text();
        console.log(db);
        lsc=this;
        if(cellObject.value==$(this).html()){
            return;
        }
        if(cellObject.formula){
            deleteFormula(cellObject,this);
        }
        cellObject.value=$(this).text();
        updateCell(rowId,colId,cellObject.value);
    })

    //the below function is used to convert val=>formula and from formula=>new formula
    $("#formula-input").on("blur",function(){
        let cellObj=getCell(lsc);
        if(cellObj.formula==$(this).val()){
            return;
        }
        let {colId,rowId}=getrc(lsc);
        if(cellObj.formula){
            //should send lsc
            deleteFormula(cellObj,lsc);//it is used to remove upstream and downstream
        }
        cellObj.formula=$(this).val();
        addFormula(lsc,cellObj.formula);//it is used to set upstream and downstream
        let nVal=evaluate(cellObj);
        updateCell(rowId,colId,nVal,true);
    })


    //this formula is used to set yourself to downstream of your parents and set parent to your upstream
    function addFormula(cellObject,formula){
        //(A1 + B1)
        formula=formula.replace("(","").replace(")","");
        //"A1 + B1"
        let formulaComponent=formula.split(" ");
        //[A1,+,B1]
        for(let i=0;i<formulaComponent.length;i++){
            let charAt0=formulaComponent[i].charCodeAt(0);
            if(charAt0>64 && charAt0<91){
                let {r,c}=getParentRowCol(formulaComponent[i],charAt0);
                let parentCell=db[r][c];
                let {colId,rowId}=getrc(cellObject);
                parentCell.downstream.push({
                    colId:colId,rowId:rowId
                });

                let presentCell=getCell(cellObject);//to get the present cell from db and update the upstream
                presentCell.upstream.push({
                    colId:c,
                    rowId:r
                })
            }
        }
    }

    //to get the parent row and col called from add formula
    function getParentRowCol(cellName,charAt0){
        let cellNameArr=cellName.split("");
        //eg A23 => [A,2,3]
        cellNameArr.shift();
        let cellRow=cellNameArr.join("");
        let r=Number(cellRow)-1;
        let c=charAt0-65;
        return{
            r,c
        }
    }

    //It is used to remove upstream and downstream
    function deleteFormula(cellObject,cellElem){
        cellObject.formula="";
        let {rowId,colId}=getrc(cellElem);
        for(let i=0;i<cellObject.upstream.length;i++){
            let uso=cellObject.upstream[i];
            let fuso=db[uso.rowId][uso.colId];
            let fArr=fuso.downstream.filter(function(dCell){
                return dCell.colId!=colId || dCell.rowId==rowId
                // return !(dCell.colId == colID && dCell.rowId == rowId)
            })
            fuso.downstream=fArr;
        }
        cellObject.upstream=[];
    }

    //upstream => go to your upstream => get there values
        //(A1 + A11 + A2 )=[(,A1,+,A11,+,A1,)]=>[(,10,+,A11,+,10,)]=>( 10 + A11 + 10 )
    function evaluate(cellObject){
        let formula=cellObject.formula;
        console.log(formula);
        for(let i=0;i<cellObject.upstream.length;i++){
            let cuso=cellObject.upstream[i];
            let colAddress=String.fromCharCode(cuso.colId+65);
            let cellAddress=colAddress+(cuso.rowId+1);
            let fusoKiVal=db[cuso.rowId][cuso.colId].value;
            let formulaCompArr=formula.split(" ");
            formulaCompArr=formulaCompArr.map(function(ele){
                if(ele==cellAddress){
                    return fusoKiVal;
                }else{
                    return ele;
                }
            })
            formula=formulaCompArr.join(" ");
        }
        console.log(formula);
        return eval(formula);
    }

    //set yourself to parents downstream set parent to your upstream
    function updateCell(rowId,colId,nVal){
        let cellObject=db[rowId][colId];
        cellObject.value=nVal;
        $(`#grid .cell[row-id=${rowId}][col-id=${colId}]`).html(nVal);
        for(let i=0;i<cellObject.downstream.length;i++){
            let dsocordObj=cellObject.downstream[i];
            let dso=db[dsocordObj.rowId][dsocordObj.colId];
            let dsonVal=evaluate(dso);
            updateCell(dsocordObj.rowId,dsocordObj.colId,dsonVal);
        }
    }


    //get row and col id from ui
    function getrc(elem){
        let colId=Number($(elem).attr("col-id"));
        let rowId=Number($(elem).attr("row-id"));
        return{
            colId,rowId
        }
    }

    //to get the elem from the db array
    function getCell(elem){
        let {colId,rowId}=getrc(elem);
        return db[rowId][colId];
    }


    function init(){
        $("#File").trigger("click");
        $("#New").trigger("click");
        // db=[];
        // let allRows=$("#grid").find(".row");
        // //console.log(allRows);
        // for(let i=0;i<allRows.length;i++){
        //     let row=[];
        //     let allCols=$(allRows[i]).find(".cell");
        //     for(let j=0;j<allCols.length;j++){
        //         let cell={
        //             value:"",
        //             formula:"",
        //             downstream:[],
        //             upstream:[]
        //         }
        //         row.push(cell);
        //     }
        //     db.push(row);
        // }
        // console.log(db);
    }
    init();
})