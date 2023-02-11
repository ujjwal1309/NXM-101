const express=require("express");
const fs=require("fs");
const {routeLogger}=require("./middleware/routeLogger")

const app=express();

app.use(routeLogger);

app.get("/",(req,res)=>{
    console.log("Home")
    res.send("Home page");
})

app.get("/about",(req,res)=>{
    console.log("about")
    res.send("about page");
})

app.get("/contacts",(req,res)=>{
    const query=req.query
    console.log(query)
    res.send("contact page");
})


app.get("/data",(req,res)=>{
    let data=fs.readFileSync("./db.json","utf-8")
    res.send(data);
})

app.listen(3000,()=>{
    console.log("servert is working")
})
