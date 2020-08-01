const $ = require("jquery");
const path = require("path");
const fs = require("fs");
const os = require('os');
const pty = require('node-pty');
const Terminal = require('xterm').Terminal;
const {FitAddon} = require('xterm-addon-fit');

require("jstree");
let myMonaco,editor;
let tabArr={};
$(document).ready(async function(){


    editor = await createEditor();
    console.log(editor);
    createTerminal();


    let parentPath = process.cwd();
    let name = path.basename(parentPath);
    let data = [{
        id:parentPath,
        parent:"#",
        text:name
    }]
    let childArr = createData(parentPath);
    console.log(childArr);
    data = [...data,...childArr];
    console.log(data);

    $("#tree").jstree({
        "core":{
            "check_callback":true,
            "data":data
        }
    }).on("open_node.jstree",
    function(e,data){
        console.log(e);
        console.log(data);
        // let childNodePath = data.node.id;
        // let childNodeArr = createData(childNodePath);
        // for(let i = 0; i < childNodeArr.length;i++){
        //     $('#tree').jstree().create_node(childNodePath,childNodeArr[i],"last");
        // }
        let children = data.node.children;
        for(let i = 0;i < children.length;i++){
            let gcArr = createData(children[i]);
            for(let j = 0;j < gcArr.length;j++){
                let doesExist = $('#tree').jstree(true).get_node(gcArr[j].id);
                if(doesExist){
                    return;
                }
                $('#tree').jstree().create_node(children[i],gcArr[j],"last");
            }
        }
    }).on("select_node.jstree",function(e,dataObj){
        let fPath = dataObj.node.id;
        let isFile = fs.lstatSync(fPath).isFile();
        if(isFile){
            setData(fPath);
            //create data
            createTab(fPath);
        }
    })
    function createData(parentPath){
        let isDir = fs.lstatSync(parentPath).isDirectory();
        if(!isDir){
            return [];
        }
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


    

    function createEditor(){
        const path = require('path');
		const amdLoader = require('./node_modules/monaco-editor/min/vs/loader.js');
		const amdRequire = amdLoader.require;
		const amdDefine = amdLoader.require.define;

		// function uriFromPath(_path) {
		// 	var pathName = path.resolve(_path).replace(/\\/g, '/');
		// 	if (pathName.length > 0 && pathName.charAt(0) !== '/') {
		// 		pathName = '/' + pathName;
		// 	}
		// 	return encodeURI('file://' + pathName);
		// }

		amdRequire.config({
			baseUrl:'./node_modules/monaco-editor/min'
		});

		// workaround monaco-css not understanding the environment
		self.module = undefined;

        return new Promise(function(resolve,reject){
            amdRequire(['vs/editor/editor.main'], function() {
                var editor = monaco.editor.create(document.getElementById('editor'), {
                    value: [
                        'function x() {',
                        '\tconsole.log("Hello world!");',
                        '}'
                    ].join('\n'),
                    language: 'javascript'
                });
                myMonaco = monaco;
                resolve(editor);
            });
        })

        // console.log("Abhi nahi aaye");
    }

    function createTerminal(){
        // Initialize node-pty with an appropriate shell
        const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
        const ptyProcess = pty.spawn(shell, [], {
            name: 'xterm-color',
            cols: 80,
            rows: 30,
            cwd: process.cwd(),
            env: process.env
        });

        // Initialize xterm.js and attach it to the DOM
        const xterm = new Terminal();
        const fitAddon = new FitAddon();
        // console.log(fitAddon);
        xterm.loadAddon(fitAddon);
        xterm.open(document.getElementById('terminal'));
        // xterm.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
        // Make the terminal's size and geometry fit the size of #terminal-container
        fitAddon.fit();


        // Setup communication between xterm.js and node-pty
        xterm.onData(data => ptyProcess.write(data));
        ptyProcess.on('data', function (data) {
            xterm.write(data);
        });        
    }

})

function setData(fPath){
    let content = fs.readFileSync(fPath,"utf-8");
    // console.log(content);
    editor.getModel().setValue(content);
    var model = editor.getModel(); // we'll create a model for you if the editor created from string value.
    let ext = fPath.split(".").pop();
    if(ext == "js"){
        ext = "javascript";
    }
    myMonaco.editor.setModelLanguage(model, ext);
}

function createTab(fPath){
    let fName = path.basename(fPath);
    if(!tabArr[fPath]){
        $("#tabs-row").append(`<div class ="tab">
        <div class="tab-name" id=${fPath} onclick=handleTab(this)>${fName}</div>
        <i class="fas fa-times" id=${fPath} onclick=handleClose(this)></i>
        </div>`)
        tabArr[fPath] = fName;
    }
}

function handleTab(elem){
    let fPath = $(elem).attr("id");
    setData(fPath);
}

function handleClose(elem){
    let fPath = $(elem).attr("id");
    delete tabArr[fPath];
    $(elem).parent().remove();
    fPath =$(".tab .tab-name").eq(0).attr("id");
    console.log(fPath);
    if(fPath){
        setData(fPath);
    }
    // let fPathArr = $(".tab");
    // console.log(fPathArr.length);
    // console.log(fPathArr[0]);
    // if(fPathArr.length > 0){

    //     fPath = $(fPathArr[0]).attr("id");
    //     console.log(fPath);
    //     setData(fPath);
    // }
}
