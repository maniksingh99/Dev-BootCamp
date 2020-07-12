const $ = require("jquery");
require("jstree");
const nodePath = require('path');

$(document).ready(function(){

    let currPath = process.cwd();
    console.log(currPath);
    console.log(getName(currPath));

    let data = [];
    let baseObj={
        id:currPath,
        parent:"#",
        text:getName(currPath)
    };

    data.push(baseObj);

    $("#file-explorer").jstree({
        "core":{
            "data":data
        }
    })

    function getName(path){
        return nodePath.basename(path);
    }

})