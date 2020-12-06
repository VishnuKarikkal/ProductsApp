const mongoose=require('mongoose')
const ProductSchema=mongoose.Schema(
    {
       name:String,
       description:String,
       image:String
    }
);
const Product=mongoose.model('product',ProductSchema);
module.exports=Product;