const mongoose=require("mongoose");
require("dotenv").config()

const connection=mongoose.connect(process.env.mongoURL); //mongo address is required

//IMPORTANT==>  required is the key here not require

userSchema=mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    city:{type:String,required:true},
    is_Married:{type:Boolean,required:true}
},{
    versionKey:false
})

UserModel=mongoose.model("user",userSchema);

module.exports={connection,UserModel};