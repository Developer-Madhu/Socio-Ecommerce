import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './database/database.js'
import NewProduct from './models/ProductSchema.js';


const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

ConnectDB()
    .catch((err) => {
        console.log("MongoDB Conn error !")
    })

app.post('/admin/products', async (req,res) => {
    const {name, price, category, stock, image} = req.body;
    const addProduct = await NewProduct.create({name, price, category, stock, image})
    if(!addProduct){
        return res.json({msg: "Please Try again!"})
    }else{
        return res.json({msg : "Product Added Successfully!"})
    }
})

app.get('/admin/products', async (req,res) => {
    const products = await NewProduct.find()
    if(!products){
        return res.json({msg : "No Products Found!"})
    }else{
        return res.json(products)
    }
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})