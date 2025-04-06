import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import ConnectDB from './database/database.js'
import NewProduct from './models/ProductSchema.js';
import NewUser from './models/userModel.js'


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

app.post('/admin/products', async (req, res) => {
    const { name, price, category, stock, image, description } = req.body;
    const addProduct = await NewProduct.create({ name, price, category, stock, image, description })
    if (!addProduct) {
        return res.json({ msg: "Please Try again!" })
    } else {
        return res.json({ msg: "Product Added Successfully!" })
    }
})

app.get('/admin/products', async (req, res) => {
    const products = await NewProduct.find()
    if (!products) {
        return res.json({ msg: "No Products Found!" })
    } else {
        return res.json(products)
    }
})

app.post("/auth/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.json({ success: false, msg: "Fill all the fields" })
    } else {
        try {
            const existingUser = await NewUser.findOne({ email });
            if (existingUser) {
                return res.json({ success: false, msg: "User already exists" });
            } else {
                const hashpass = await bcrypt.hash(password, 10)
                const newuser = new NewUser({ name, email, password: hashpass})
                await newuser.save()
                const webtokens = jwt.sign({ id: newuser._id }, 'supersecret12', { expiresIn: '7d' });
                res.cookie('token', webtokens, {
                    httpOnly: true,
                    secure: 'development',
                    sameSite: 'none',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
            }
        } catch (e) {
            console.log("Something went wrong", e)
        }

        res.json({ message: "User registered successfully" });
        console.log("User registered successfully")
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})