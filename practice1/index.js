const http=require("http");
const fs=require("fs")

const server=http.createServer((req,res)=>{
    if(req.url==="/"){
        res.end("This is home page")
    }else if(req.url==="/post"){
        const startTime=new Date().getTime();
        //Without stream
        //const posts=fs.readFileSync("./db.json","utf-8")
        //With Stream
        const posts=fs.createReadStream("./db.json","utf-8");
        const endDate=new Date().getTime();
        fs.appendFileSync("./logs.txt",`Path: ${req.url} || Method: ${req.method} || Response Time: ${endDate-startTime}ms\n`)
        posts.pipe(res)
    }
    else if(req.url==="/add" && req.method==="POST"){
        let str=""
        req.on("data",(el)=>{
            str+=el;
        })

        req.on("end",(el)=>{
            console.log(str)
        })
        res.end("data has been recorded");
    }
    else{
        console.log(res.headers)
        res.end(res.statusCode[404]);
    }
})

server.listen(4000,()=>{
    console.log("http://localhost:4000");
})