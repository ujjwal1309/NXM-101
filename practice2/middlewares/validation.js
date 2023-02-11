// const express=require("express");

const validation=(req,res,next)=>{
    if(req.method==="POST"){
        const {userId,id,title,body}=req.body;
        if(userId && id && title && body){
            next();
        }else{
            res.send({msg:"All the fields are not present"})
        }
    }else{
        next();
    }
}

module.exports={validation};