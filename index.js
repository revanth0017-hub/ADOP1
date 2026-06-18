require('dotenv').config()

const express = require('express')
const expressApplication = express()
const initializeDatabase = require('./config/db')
const astronomyRoutes = require('./router/apodRoute')
const galleryRoutes = require('./router/galleryRouter')
const authenticationRoutes = require('./router/authRouter')

expressApplication.use(express.json())

expressApplication.use('/apod', astronomyRoutes)
expressApplication.use('/gallery', galleryRoutes)
expressApplication.use('/auth', authenticationRoutes)

expressApplication.get('/', (req, res) => {
    res.send('APOD Space Gallery server is working ')
})

const applicationPort = process.env.PORT || 3003

const startServer = async () => {
    try {
        await initializeDatabase()
        expressApplication.listen(applicationPort, () => {
            console.log(`server has started on the port ${applicationPort}`)
        })
    } catch (databaseError) {
        console.error('Server start aborted because MongoDB could not connect.')
        process.exit(1)
    }
}

startServer()
