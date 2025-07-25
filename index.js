const dotenv = require('dotenv') 
dotenv.config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/dbConnect');

const app = express()

const port = process.env.PORT || 8000

connectDB().then(() => {
    app.listen(port, () => {
        console.log("App is listening on port ", port)
    })
}).catch(err => {
    console.log("Error while starting the app", err)
})


app.use(cors({origin: 'http://localhost:5173', credentials: true}))

app.get('/test', (req, res) => {
    res.send('working')
})