const cloudinaryClient = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

cloudinaryClient.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const cloudinaryStorageInstance = new CloudinaryStorage({
    cloudinary: cloudinaryClient,
    params: {
        folder: "apod_gallery",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: [{ width: 1920, crop: "limit" }]
    }
})

const imageUpload = multer({ storage: cloudinaryStorageInstance })

module.exports = { cloudinary: cloudinaryClient, upload: imageUpload }
