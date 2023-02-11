const validator=(req,res,next)=>{
    if(req.method==="POST"){
        const {title,genre,price,author}=req.body;
        if(title && genre && price && author){
            next();
        }else{
            res.send({"err": "All the fields are not there"})
        }
    }else{
        next();
    }
}

module.exports={validator};