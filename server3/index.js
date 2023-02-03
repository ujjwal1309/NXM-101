const http=require("http");
const fs=require("fs");


const server=http.createServer((req,res)=>{
    if(req.url==="/"){
        res.setHeader("Content-Type","text/html")
        res.write("<h1>Welcome to my test server</h1>")
        res.end();
    }else if(req.url==="/naruto"){
        let content=fs.readFileSync("./text.txt","utf-8");
        res.setHeader("Content-Type","text/html")
        res.write(`<h1 style="color:red; background-color:black;">${content}</h1>`)
        res.end();
    }else if(req.url==="/update" && req.method==="POST"){
        let str="";
        req.on("data",(chunk)=>{
            str+=chunk;
        });

        req.on("end",()=>{
            console.log(str);
        })

        res.end("data has been recorded")

    }
    else{
        res.end(http.STATUS_CODES["404"])
    }
})


server.listen(4000,()=>{
    console.log("server is running")
})