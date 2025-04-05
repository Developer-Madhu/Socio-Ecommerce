import mongoose from 'mongoose'

const Product = mongoose.Schema({
    name: {type:String, required:true},
    price: {type:Number, required:true},
    category: {type:String, required:true},
    stock: {type:Number, required:true},
    image: {type:String, required:true}
})

const NewProduct = mongoose.model("Product", Product)

export default NewProduct;