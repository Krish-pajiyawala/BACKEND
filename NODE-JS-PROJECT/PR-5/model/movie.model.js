const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const movieSchema = mongoose.Schema({
    title: String,
    director: String,
    genre: String,
    releaseYear: Number,
    description: String,
    rating: Number,
    poster: String
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, "movie-" + Date.now() + path.extname(file.originalname));
    }
});

movieSchema.statics.uploadPoster =
    multer({ storage }).single("poster");

module.exports = mongoose.model("Movie", movieSchema);
