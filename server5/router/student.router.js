const express=require("express");

const studentRouter=express.Router();

studentRouter.get("/",(req,res)=>{
    res.send("This is student database");
})

studentRouter.get("/add",(req,res)=>{
    res.send("Data has been successfully added");
})

module.exports={studentRouter};