import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const db = process.env.MONGO_URL

const connectDB = async()=>{
    try {
        await mongoose.connect(db)
        console.log("Connection to database is successfull")
    } catch (error) {
        console.log(error)
    }
    
}


export default connectDB