const http=require("http");
const fs=require("fs");

const server=http.createServer((req,res)=>{
    if(req.url==="/data"){
        res.end("This is the beginning of the new era")
    }else if(req.url==="/user"){
        fs.readFile("./data.json",(err,data)=>{
            if(err){
                res.write(err);
                res.end();
            }else{
                res.end(data);
            }
        })

    }
    else{
        res.end(http.STATUS_CODES["404"])
    }
})

server.listen(1400,()=>{
    console.log("server is running ")
})
