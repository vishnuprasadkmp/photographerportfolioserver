const mongoose=require('mongoose')

exports.connectDb=async()=>{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("database connected");
    
}
