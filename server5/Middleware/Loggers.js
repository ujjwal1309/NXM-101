const fs=require("fs");

const TimeLogger=((req,res,app)=>{
    const startTime=new Date().getTime();
    app();
    const endTime=new Date().getTime();
    fs.writeFileSync("./time.txt",`Path: "${req.url}" || Response At: ${endTime-startTime} ms`);
})

const Logger=(req,res,next)=>{
    fs.appendFileSync("./logs.txt",`URL: "${req.url}" || Method: ${req.method}\n`);
    next()
}

module.exports={TimeLogger,Logger}