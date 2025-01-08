import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const MongoDbConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(` \n "DB connected Successfully !! DB host : ${MongoDbConnectionInstance.connection.host}`)
    } catch (error) {
        console.log("DB Connection FAILED",error)
        process.exit(1)
    }
}

export default connectDB