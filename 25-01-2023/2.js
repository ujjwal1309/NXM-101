let sum=(a,b)=>{
    console.log(a+b);
}

let diff=(a,b)=>{
    console.log(a-b)
}

let multiply=(a,b)=>{
    console.log(a*b);
}

module.exports={sum,diff,multiply}

const ab=require('crypto')

const fs=require('fs');

const buffer = new Buffer.alloc(1024);
// console.log(buffer)

// console.log(fileHandle.read())

fs.open('read.txt', 'r+', (err,fd)=>{
    if(err) return console.log(err);

    fs.read(fd,buffer,0,buffer.length, 0, (err,bytes)=>{
        if(err) console.log(err);

        if(bytes > 0) console.log(buffer.slice(0,bytes).tostring());

        console.log(bytes + " bytes read");

        //close the opened file
    
        fs.close(fd, function(err){
            if(err){
                console.log(err);
            }
        })
    })


})