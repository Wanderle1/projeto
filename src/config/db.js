import mongoose from "mongoose"

const connectDB = async () => {
     mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_ADDRESS}/${process.env.DB_NAME}`).then(() => console.log('connected to MongoDB')).catch((error) => console.error(error))
    }

export default connectDB