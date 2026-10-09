import mongoose from 'mongoose'
export async function connectDb(){
    await mongoose.connect(process.env.MONGO_URI)
}