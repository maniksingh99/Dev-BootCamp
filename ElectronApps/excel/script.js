const $=require("jquery");


$(document).ready(function(){
    let db;
    let lsc;
    $("#grid .cell").on("click",function(){
        let {colId,rowId}=getrc(this);
        let value=String.fromCharCode(65+colId)+(rowId+1);
        $('#text-input').val(value);
    })

    //this is fullfilling two cases when value=>value and 
    $("#grid .cell").on("blur",function(){
        let {colId,rowId}=getrc(this);
        db[rowId][colId].value=$(this).text();
        console.log(db);
        lsc=this;
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
            deleteFormula(cellObj);//it is used to remove upstream and downstream
        }
        cellObj.formula=$(this).val();
        addFormula(lsc,cellObj.formula);//it is used to set upstream and downstream
        updateCell(rowId,colId,nval,true);
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
    function deleteFormula(cellObject){
        cellObject.formula="";
        let {rowId,colId}=getCell(cellObject);
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
                row.push(cell);
            }
            db.push(row);
        }
        console.log(db);
    }
    init();
})