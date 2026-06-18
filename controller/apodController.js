const AstronomyOfTheDay = require("../models/Apod");
const { cloudinary } = require("../config/cloudinary");

exports.createApod = async (req, res) => {
    try {
        const { title, date, explanation, media_type, hdurl, copyright } = req.body;

        let imageUrl = req.body.url || null;
        if (req.file) {
            imageUrl = req.file.path;
        }

        const createdAstronomyEntry = await AstronomyOfTheDay.create({
            title,
            date,
            explanation,
            media_type: media_type || "image",
            url: imageUrl,
            hdurl,
            copyright
        });

        res.status(201).json({
            message: "apod created successfully",
            data: createdAstronomyEntry
        });
    } catch (error) {
        res.status(500).json({ message: error.message || error });
    }
};

exports.listApod = async (req, res) => {
    try {
        const astronomyRecords = await AstronomyOfTheDay.find();
        res.status(200).json({
            message: "apod list complete",
            count: astronomyRecords.length,
            data: astronomyRecords
        });
    } catch (error) {
        res.status(500).json({ message: error.message || error });
    }
};

exports.getApodDetails = async (req, res) => {
    try {
        const astronomyEntry = await AstronomyOfTheDay.findById(req.params.id);
        if (!astronomyEntry) {
            return res.status(404).json({ message: "apod record not found" });
        }
        res.status(200).json({
            message: "apod details complete",
            data: astronomyEntry
        });
    } catch (error) {
        res.status(500).json({ message: error.message || error });
    }
};

exports.updateApod = async (req, res) => {
    try {
        const dataToUpdate = { ...req.body };

        if (req.file) {
            const existingRecord = await AstronomyOfTheDay.findById(req.params.id);
            if (existingRecord && existingRecord.url) {
                const urlParts = existingRecord.url.split("/");
                const fileIdentifier = urlParts[urlParts.length - 1].split(".")[0];
                const cloudinaryPublicId = "apod_gallery/" + fileIdentifier;
                await cloudinary.uploader.destroy(cloudinaryPublicId);
            }
            dataToUpdate.url = req.file.path;
        }

        const updatedAstronomyEntry = await AstronomyOfTheDay.findByIdAndUpdate(
            req.params.id,
            dataToUpdate,
            { new: true, runValidators: true }
        );
        if (!updatedAstronomyEntry) {
            return res.status(404).json({ message: "apod record not found" });
        }
        res.status(200).json({
            message: "apod updated successfully",
            data: updatedAstronomyEntry
        });
    } catch (error) {
        res.status(500).json({ message: error.message || error });
    }
};

exports.deleteApod = async (req, res) => {
    try {
        const astronomyEntry = await AstronomyOfTheDay.findById(req.params.id);
        if (!astronomyEntry) {
            return res.status(404).json({ message: "apod record not found" });
        }

        if (astronomyEntry.url && astronomyEntry.url.includes("cloudinary")) {
            const urlParts = astronomyEntry.url.split("/");
            const fileIdentifier = urlParts[urlParts.length - 1].split(".")[0];
            const cloudinaryPublicId = "apod_gallery/" + fileIdentifier;
            await cloudinary.uploader.destroy(cloudinaryPublicId);
        }

        await AstronomyOfTheDay.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "apod deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message || error });
    }
};
