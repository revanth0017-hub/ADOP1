const mongoose = require("mongoose")

const AstronomySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    explanation: {
        type: String
    },
    media_type: {
        type: String,
        default: "image"
    },
    url: {
        type: String
    },
    hdurl: {
        type: String
    },
    copyright: {
        type: String
    }
})

module.exports = mongoose.model("Apod", AstronomySchema)
