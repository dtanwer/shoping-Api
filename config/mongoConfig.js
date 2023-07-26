import mongoose from 'mongoose'
const mongoConnection = () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDb")
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default mongoConnection;
