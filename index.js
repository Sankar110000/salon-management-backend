const dotenv = require('dotenv') 
dotenv.config({ quiet: true })
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/dbConnect');
const userRouter = require('./routes/userRoutes');
const serviceRouter = require('./routes/serviceRoutes')
const staffRouter = require('./routes/staffRoutes')
const appointmentRouter = require('./routes/appointmentRoutes')

const app = express()

const port = process.env.PORT || 8000

connectDB().then(() => {
    app.listen(port, () => {
        console.log("App is listening on port ", port)
    })
}).catch(err => {
    console.log("Error while starting the app", err)
})

const corsOptions = { origin: "*",credentials: true}
app.use(cors(corsOptions))

// app.options("*", cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

app.use("/api/user",userRouter)
app.use("/api/service",serviceRouter)
app.use("/api/staff",staffRouter)
app.use("/api/appointment",appointmentRouter)


app.get('/test', (req, res) => {
    res.send('working')
})