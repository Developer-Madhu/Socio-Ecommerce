import mongoose from 'mongoose'

const ConnectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/socio")
        console.log('\nMongoDB Connected !')
    }catch(er){
        console.log("MongDB Connection Failed!")
        console.error(er)
        process.exit(1)
    }
}
export default ConnectDB