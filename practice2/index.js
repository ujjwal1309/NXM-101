const express=require("express");
const { validation } = require("./middlewares/validation");
const { todoRouter } = require("./routes/todos.router");

const server=express();

server.use(express.json());
//validation middleware
server.use("/todos",validation)
server.use("/todos",todoRouter);

server.get("/",(req,res)=>{
    res.send("This is home page");
})

server.listen(4000,()=>{
    console.log("https://localhost:4000");
})