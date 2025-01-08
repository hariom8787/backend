import connectDB from './db/index.js'
import dotenv from 'dotenv'


dotenv.config({
    path : './env'
})
connectDB()
.then(
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running on PORT : ${process.env.PORT}`)
    })
)
.catch((err) => {
    console.log("service connection Failed !!", err)
})
























/*
import express from 'express';
const app = express()


( async()=>{
try {
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     app.on('Error' , (Error)=>{
        console.log("Error",Error);
        throw Error
})  

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
} catch (error) {
    console.error("ERROR",error)
    throw error
}

})()
*/