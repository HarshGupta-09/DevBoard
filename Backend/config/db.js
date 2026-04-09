import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connceted")
        
    } catch (error) {
         console.error(" DB Error:", error.message);
    
        
    }
}

export default connectDB;