const express=require("express");
const fs=require("fs");

const server=express();
server.use(express.json())
server.get("/",(req,res)=>{
    res.setHeader("Content-Type",("text/html"))
    res.send("<h1>server is running</h1>")
})

server.get("/student",(req,res)=>{
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err) throw err;

        let newData=JSON.parse(data);

        res.json(newData.students);
    })
})

server.post("/addStudent",(req,res)=>{
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"));
    console.log(req.body)
    data.students.push(req.body);
    fs.writeFileSync("./db.json",JSON.stringify(data));
    res.send("data has been successfully added");
})

server.post("/add",(req,res)=>{
    console.log(req.body);
    res.send("Data has been added");
})

server.delete("/deleteStudent",(req,res)=>{
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let newData=data.students.filter((el)=>{
        return el.name!=="ujjwal";
    });
    data.students=newData;
    console.log(data)
    fs.writeFileSync("./db.json",JSON.stringify(data));
    res.send("deleted")
})

server.listen(1600,()=>{
    console.log("<h1>server is running");
})