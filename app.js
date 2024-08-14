import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/authRouter.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

// Parent Router
app.use('/api/v1/auth', authRouter)

app.use(notFound)
app.use(errorHandler)

// Server
app.listen(port, () => {
  console.log(`Aplikasi ini jalan di port ${port}`)
})

// Connection DB
mongoose.connect(process.env.DATABASE).then(() => {
  console.log('Database connected!')
}).catch(err => {
  console.log(err)
})