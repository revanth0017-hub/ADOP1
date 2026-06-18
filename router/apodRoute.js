const {
    createApod,
    listApod,
    getApodDetails,
    updateApod,
    deleteApod
} = require("../controller/apodController")
const { searchGallery, filterByDate, filterByMediaType } = require("../controller/galleryController")
const { authenticate } = require("../controller/authController")
const { upload } = require("../config/cloudinary")
const express = require("express")
const astronomyRouter = express.Router()

// Search and filter (placed before /:id to avoid route conflict)
astronomyRouter.get("/search", searchGallery)
astronomyRouter.get("/filter/date", filterByDate)
astronomyRouter.get("/filter/type", filterByMediaType)

// CRUD Endpoints
astronomyRouter.post("/add", authenticate, upload.single("image"), createApod)
astronomyRouter.get("/get", listApod)
astronomyRouter.get("/get/:id", getApodDetails)
astronomyRouter.put("/update/:id", authenticate, upload.single("image"), updateApod)
astronomyRouter.delete("/del/:id", authenticate, deleteApod)

module.exports = astronomyRouter
