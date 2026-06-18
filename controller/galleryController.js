const AstronomyOfTheDay = require("../models/Apod");

exports.searchGallery = async (req, res) => {
    try {
        const searchQuery = req.query.q || "";
        const resultsPerPage = parseInt(req.query.limit) || 10;
        const mongoQuery = searchQuery ? { title: { $regex: searchQuery, $options: "i" } } : {};
        const searchResults = await AstronomyOfTheDay.find(mongoQuery).limit(resultsPerPage);

        res.status(200).json({
            message: "gallery search complete",
            count: searchResults.length,
            result: searchResults
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error
        });
    }
};

exports.filterByDate = async (req, res) => {
    try {
        const startDate = req.query.from || "";
        const endDate = req.query.to || "";
        let mongoQuery = {};

        if (startDate && endDate) {
            mongoQuery.date = { $gte: startDate, $lte: endDate };
        } else if (startDate) {
            mongoQuery.date = { $gte: startDate };
        } else if (endDate) {
            mongoQuery.date = { $lte: endDate };
        }

        const filteredResults = await AstronomyOfTheDay.find(mongoQuery);
        res.status(200).json({
            message: "date filter complete",
            count: filteredResults.length,
            result: filteredResults
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error
        });
    }
};

exports.filterByMediaType = async (req, res) => {
    try {
        const mediaType = req.query.type || "image";
        const filteredResults = await AstronomyOfTheDay.find({ media_type: mediaType });

        res.status(200).json({
            message: "media type filter complete",
            count: filteredResults.length,
            result: filteredResults
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error
        });
    }
};
