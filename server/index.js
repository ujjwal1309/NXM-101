const http=require("http");
const fs=require("fs");

const server=http.createServer((req,res)=>{
    if(req.url==="/data"){
        res.end("This is the beginning of the new era")
    }else if(req.url==="/user"){

        const dataStream=fs.createReadStream("./data.json","utf-8");
        dataStream.pipe(res);

    }else if(req.url=="/update"&& req.method=="POST"){
        let str="";
        req.on("data",(chunk)=>{
            str+=chunk;
        })

        req.on("end",()=>{
            console.log(str)
        })

        res.end("data added");

    }else{
        res.end(http.STATUS_CODES["404"])
    }
})

server.listen(1400,()=>{
    console.log("server is running ")
})
