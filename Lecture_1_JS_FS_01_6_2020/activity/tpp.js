let input=process.argv.slice(2);
let viewFile=require("./commands/view");
let untreefyFnFile=require("./commands/untreefy");
let treefyFnFile=require("./commands/treefy");
console.log(input);


let cmd=input[0];

switch(cmd){
    case "view":
        viewFile.view(process.argv[3],process.argv[4]);
        break;
    case "treefy":
        treefyFnFile.treefyFn(process.argv[3],process.argv[4]);
        //console.log("Treefy command implemented");
        break;
    case "untreefy":
        untreefyFnFile.untreefyFn(process.argv[3],process.argv[4]);
        //console.log("Untreefy command implemented");
        break;
    case "help":
        console.log("Help command implemented");
        break;
        
}
