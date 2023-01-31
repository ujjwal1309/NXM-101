const {argv}=require("process");
const fs=require("fs");
const path=require("path");
let direct=path.join(__dirname,"Documents");
console.log(direct)
const {randomBytes}=require("crypto");
randomBytes(256, (err, buf) => {
    if (err) throw err;
    console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
  })

  fs.readFile('./read.txt',"utf-8",(err,data)=>{
    if(err) throw err;
    console.log(data);
  })