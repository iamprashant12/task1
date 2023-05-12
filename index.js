const express = require("express");
const app = express();

const mongoose = require("mongoose");

const productSchema = require("./schema/products");

mongoose.connect("mongodb://localhost:27017/task1")

app.use(express.json())

app.post('/product',async function(req,res){
    try {
        if(!req.body.payload){
            throw new Error("Payload must be provided")
        }
        for(let obj of req.body.payload){
            let productDetails= await productSchema.find({
                productId: obj.productId
            })
            if(productDetails!=undefined)
            {
                let newQuantity;
                if(obj.operation ==='add'){
                    newQuantity = productDetails.quantity+obj.quantity;
                }
                else{ 
                    newQuantity = productDetails.quantity-obj.quantity;
                }

                await productSchema.updateOne({
                    productId: obj.productId,
                },{
                    productId: obj.productId,
                    quantity: newQuantity
                })
            }
            else{
                throw new Error("Product not found");
            }
        }
        return res.status(200).end();
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
})


app.listen(8800, () => {
  console.log("Server is running at 8800 port");
});