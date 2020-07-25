const $ = require("jquery");
const path = require("path");
const fs = require("fs");
require("jstree");

$(document).ready(function(){
    let parentPath = process.cwd();
    let name = path.basename(parentPath);
    let data = [{
        id:parentPath,
        parent:"#",
        text:name
    }]
    let childArr = createData(parentPath);
    data = [...data,...childArr];
    console.log(data);
    $("#tree").jstree({
        "core":{
            "check_callback":true,
            "data":data
        }
    }).on("select_node.jstree",
    function(e,data){
        // console.log(data);
        let childNodePath = data.node.id;
        let childNodeArr = createData(childNodePath);
        for(let i = 0; i < childNodeArr.length;i++){
            $('#tree').jstree().create_node(childNodePath,childNodeArr[i],"last");
        }
    })
    function createData(parentPath){
        let childrens = fs.readdirSync(parentPath);
        let cdata = [];
        for(let i = 0; i < childrens.length;i++){
            let childPath = path.join(parentPath,childrens[i]);
            let obj={
                id:childPath,
                parent:parentPath,
                text:childrens[i]
            }
            cdata.push(obj);
        }
        return cdata;
    }
})


// $(document).ready(function(){

//     let currPath = process.cwd();
//     console.log(currPath);
//     console.log(getName(currPath));

//     let data = [];
//     let baseObj={
//         id:currPath,
//         parent:"#",
//         text:getName(currPath)
//     };

//     data.push(baseObj);

//     $("#file-explorer").jstree({
//         "core":{
//             "data":data
//         }
//     })

//     function getName(path){
//         return nodePath.basename(path);
//     }

// })