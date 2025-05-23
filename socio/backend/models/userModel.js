import mongoose from 'mongoose'

const User = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
})

const NewUser = mongoose.model("User", User)

export default NewUser;