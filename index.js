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
const User = require('./models/user.model')
const Service = require('./models/service.model')
const Staff = require('./models/staff.model')
const Appointment = require('./models/appointment.model')

const app = express()

const port = process.env.PORT || 8000

connectDB().then(() => {
    app.listen(port, () => {
        console.log("App is listening on port ", port)
    })
}).catch(err => {
    console.log("Error while starting the app", err)
})

const allowedOrigin = ['https://salon-bliss.netlify.app', 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api/user",userRouter)
app.use("/api/service",serviceRouter)
app.use("/api/staff",staffRouter)
app.use("/api/appointment",appointmentRouter)


app.get('/test', (req, res) => {
    res.send('working')
})

app.post('/api/resetDB', async(req, res) => {
    try {
        await User.deleteMany({})
        await Service.deleteMany({})
        await Staff.deleteMany({})
        await Appointment.deleteMany({})
        res.send("All models are reset")
    } catch (error) {
        console.log("Error while reseting the databse", error)
    }
})