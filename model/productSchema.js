let mongoose=require("mongoose")


let productSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"Product Name is required"]

    },
    rate:{
        type:Number,
        required:[true,"Product Name is required"]
    }
},{timestamps:true})

module.exports=mongoose.model("product",productSchema)