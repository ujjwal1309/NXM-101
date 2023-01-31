const fs=require('fs')
const name='read.txt';

let data=fs.readFileSync(name);

console.log(data);