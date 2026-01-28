const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected")
    }catch(err){
        console.err("mongodb connection failed ")
    }
}
module.exports=connectDB;