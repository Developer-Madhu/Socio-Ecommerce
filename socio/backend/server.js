// import express from 'express';
// import cors from 'cors';
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'
// import ConnectDB from './database/database.js'
// import NewProduct from './models/ProductSchema.js';
// import NewUser from './models/userModel.js'


// const app = express()
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));
// app.use(express.json());

// ConnectDB()
//     .catch((err) => {
//         console.log("MongoDB Conn error !")
//     })

// app.post('/admin/products', async (req, res) => {
//     const { name, price, category, stock, image, description } = req.body;
//     const addProduct = await NewProduct.create({ name, price, category, stock, image, description })
//     if (!addProduct) {
//         return res.json({ msg: "Please Try again!" })
//     } else {
//         return res.json({ msg: "Product Added Successfully!" })
//     }
// })

// app.get('/admin/products', async (req, res) => {
//     const products = await NewProduct.find()
//     if (!products) {
//         return res.json({ msg: "No Products Found!" })
//     } else {
//         return res.json(products)
//     }
// })

// app.post("/auth/register", async (req, res) => {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//         res.json({ success: false, msg: "Fill all the fields" })
//     } else {
//         try {
//             const existingUser = await NewUser.findOne({ email });
//             if (existingUser) {
//                 return res.json({ success: false, msg: "User already exists" });
//             } else {
//                 const hashpass = await bcrypt.hash(password, 10)
//                 const newuser = new NewUser({ name, email, password: hashpass})
//                 await newuser.save()
//                 const webtokens = jwt.sign({ id: newuser._id }, 'supersecret12', { expiresIn: '7d' });
//                 res.cookie('token', webtokens, {
//                     httpOnly: true,
//                     secure: 'development',
//                     sameSite: 'none',
//                     maxAge: 7 * 24 * 60 * 60 * 1000
//                 });
//             }
//         } catch (e) {
//             console.log("Something went wrong", e)
//         }

//         res.json({ message: "User registered successfully" });
//         console.log("User registered successfully")
//     }
// });

// app.post("/auth/login", async (req, res) => {
//     const { email, password } = req.body;

//     // ✅ Check required fields
//     if (!email || !password) {
//         return res.json({ success: false, msg: "Please enter the details!" });
//     }

//     try {
//         const foundUser = await NewUser.findOne({ email });
//         if (!foundUser) {
//             return res.json({ success: false, msg: "Invalid user" });
//         }

//         const matchPass = await bcrypt.compare(password, foundUser.password);
//         if (!matchPass) {
//             return res.json({ success: false, msg: "Invalid password!" });
//         }

//         const webtokens = jwt.sign({ id: foundUser._id }, 'supersecret12', { expiresIn: '7d' });

//         res.cookie('token', webtokens, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'none',
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         });

//         return res.json({
//             success: true, msg: "Login successful!", user: {
//                 id: foundUser._id,
//                 username: foundUser.username,
//                 email: foundUser.email,
//             },
//             webtokens
//         });

//     } catch (error) {
//         console.error("Error found:", error);
//         return res.status(500).json({ success: false, msg: "Server error" });
//     }

// });

// app.listen(3000, () => {
//     console.log("Server is listening on port 3000")
// })
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ConnectDB from './database/database.js';
import NewProduct from './models/ProductSchema.js';
import NewUser from './models/userModel.js';

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

ConnectDB()
    .catch((err) => {
        console.log("MongoDB Conn error !")
    });

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ success: false, msg: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, 'supersecret12');
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, msg: "Invalid token" });
    }
};

// Add this endpoint for user verification
app.post('/auth/login', async (req, res) => { // Removed verifyToken middleware
    const {email, password} = req.body;
    
    // ✅ Check required fields
    if (!email || !password) {
        return res.status(400).json({ success: false, msg: "Please enter the details!" });
    }

    try {
        const user = await NewUser.findOne({email});
        if (!user) {
            return res.status(401).json({ success: false, msg: "Invalid credentials" });
        }

        const matchPass = await bcrypt.compare(password, user.password); // Changed foundUser to user
        if (!matchPass) {
            return res.status(401).json({ success: false, msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, 'supersecret12', { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ 
            success: true, 
            msg: "Login successful!",
            token, // Send token in response
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
});
// Add logout endpoint
app.post('/auth/logout', verifyToken, (req, res) => {
    try {
        // In a real app, you might want to add the token to a blacklist
        res.clearCookie('token');
        res.json({ success: true, msg: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({ success: false, msg: "Logout failed" });
    }
});

app.post('/admin/products', async (req, res) => {
    const { name, price, category, stock, image, description } = req.body;
    const addProduct = await NewProduct.create({ name, price, category, stock, image, description })
    if (!addProduct) {
        return res.json({ msg: "Please Try again!" })
    } else {
        return res.json({ msg: "Product Added Successfully!" })
    }
});

app.get('/admin/products', async (req, res) => {
    const products = await NewProduct.find()
    if (!products) {
        return res.json({ msg: "No Products Found!" })
    } else {
        return res.json(products)
    }
});

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
                const newuser = new NewUser({ name, email, password: hashpass })
                await newuser.save()
                const token = jwt.sign({ id: newuser._id }, 'supersecret12', { expiresIn: '7d' });
                
                // Return token in response for frontend to store in localStorage
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'none',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                
                return res.json({ 
                    success: true, 
                    message: "User registered successfully",
                    token, // Send token in response body as well
                    user: {
                        id: newuser._id,
                        name: newuser.name,
                        email: newuser.email
                    }
                });
            }
        } catch (e) {
            console.log("Something went wrong", e)
            return res.status(500).json({ success: false, msg: "Server error" });
        }
    }
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, msg: "Please enter the details!" });
    }

    try {
        const foundUser = await NewUser.findOne({ email });
        if (!foundUser) {
            return res.status(401).json({ success: false, msg: "Invalid credentials" });
        }

        const matchPass = await bcrypt.compare(password, foundUser.password);
        if (!matchPass) {
            return res.status(401).json({ success: false, msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: foundUser._id }, 'supersecret12', { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true, 
            msg: "Login successful!", 
            token, // Send token in response body as well
            user: {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
            }
        });

    } catch (error) {
        console.error("Error found:", error);
        return res.status(500).json({ success: false, msg: "Server error" });
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});