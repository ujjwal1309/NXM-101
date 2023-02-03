const routeLogger=(req,res,next)=>{
    const start=new Date().getTime();
    next()
    const time=new Date().getTime()-start;
    fs.appendFileSync("./routeDetails.txt",`Route Visited: ${req.url} || Method: ${req.method} || ResTime: ${time}ms\n`);
}

module.exports={routeLogger}