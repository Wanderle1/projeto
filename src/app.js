import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'


dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/api', userRoutes)




app.listen(3000, () => console.log('http://localhost:3000'))
