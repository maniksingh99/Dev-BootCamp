function getFirstName(fullName){
    return fullName.split(" ")[0];
}

function getLastName(fullName){
    return fullName.split(" ")[1];
}

function greeter(fullName,cb){
    let name=cb(fullName);
    console.log("Hi "+name);
}

greeter("Manik Singh",getFirstName);
greeter("Manik Singh",getLastName);