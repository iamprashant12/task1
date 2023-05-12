let mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true,
        unique:true
    },
    quantity:{
        type:Number,
        required:true,
    }
})

let Product = new mongoose.model("Product", productSchema);

module.exports = Product;