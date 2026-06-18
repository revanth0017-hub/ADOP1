const express = require("express")
const galleryRouter = express.Router()
const { searchGallery, filterByDate, filterByMediaType } = require("../controller/galleryController")

galleryRouter.get("/search", searchGallery)
galleryRouter.get("/filter/date", filterByDate)
galleryRouter.get("/filter/type", filterByMediaType)

module.exports = galleryRouter
