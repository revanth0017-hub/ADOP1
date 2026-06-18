const mongoose = require('mongoose')

const initializeDatabase = async () => {
    const mongoConnectionUri = process.env.MONGO_URI
    try {
        await mongoose.connect(mongoConnectionUri)
        console.log('db connected')
    } catch (databaseConnectionError) {
        console.error('MongoDB connection failed:', databaseConnectionError.message)
        throw databaseConnectionError
    }
}

module.exports = initializeDatabase
