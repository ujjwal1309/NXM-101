const mongoose=require("mongoose");

const bookSchema=mongoose.Schema({
    title:String,
    genre:String,
    price:Number,
    author:String
},{
    versionKey:false
})

const BookModel=mongoose.model("book",bookSchema);

module.exports={BookModel};