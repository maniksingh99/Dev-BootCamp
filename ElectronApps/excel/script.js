const $=require("jquery");
const fs=require("fs");
const dialog=require("electron").remote.dialog;

$(document).ready(function(){
    let db;
    let lsc;
    $("#grid .cell").on("click",function(){
        let {colId,rowId}=getrc(this);
        let value=String.fromCharCode(65+colId)+(rowId+1);
        $('#text-input').val(value);
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
                    upstream:[]
                }
                $(allCols[j]).html('');
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