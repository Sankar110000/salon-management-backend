const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL
const DB_NAME = 'salonManagementSystem' 

async function connectDB(){
    try {
        const connectionInstance = await mongoose.connect(`${DB_URL}/${DB_NAME}`)
        console.log(`Connected with database, host: ${connectionInstance.connection.host}, DB: ${connectionInstance.connection.name}`)
    } catch (error) {
        console.log("Error while connecting to the database", error)
        process.exit(1)
    }
}

module.exports = connectDB