const fs = require('fs');
const child=require("child_process");

fs.writeFile('./read.txt',"Those who don't know pain will never understand true peace",(err)=>{
    if(err) console.log(err);
})

fs.appendFile("./read.txt","\nby Nagato",(err)=>{
    if(err) console.log(err);
    else console.log('appended');
})

fs.readFile("./read.txt",{encoding:"utf-8"},(err,data)=>{
    if(err) throw err;

    console.log(data);

    //buffer is ascii code of the file
    //encoding:utf-8 helps us to transform into readable format
})

// let data=fs.readFileSync('./read.txt',{encoding:"utf-8"})
// console.log(data)

child.execFile("./read.txt",)