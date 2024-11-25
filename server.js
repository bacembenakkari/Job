import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'

// db and  authentification
import connectDB from './db/connect.js'
// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';



// middleware 
import notFoundMiddleware from './middleware/not-found.js'
import erroHandlerMiddelware from './middleware/error-handler.js'

app.use(express.json())




app.get('/', (req, res) =>{
   // throw new  Error ('error')
    res.send('welcome!')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(erroHandlerMiddelware)
const port = process.env.PORT || 4000

app.listen(port,() =>{
    console.log(`server is listening on port ${port}...`)
})
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,() =>{
            console.log('server is listening on port ${port}...')
        })

    } catch (error) {
        console.log(error)

    }
}


start() 