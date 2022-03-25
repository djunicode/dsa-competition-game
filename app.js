import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import db from'./config/db.js'
import morgan from'morgan'
import userRouter from'./routes/user.js'

import cors from 'cors'


const port = process.env.PORT || 3001

await db()

app.use(morgan(':method :url :status :response-time ms'))

app.use(cors())
app.use(express.json())

app.use('/api/user', userRouter)

const server = app.listen(port, () => console.log(`server has started on port ${port}`))

export default server