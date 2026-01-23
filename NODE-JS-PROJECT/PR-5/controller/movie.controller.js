const Movie = require("../model/movie.model");
const path = require("path");
const fs = require("fs");

exports.getAllMovies = async (req, res) => {
    let { search = "", sort = "", page = 1 } = req.query;

    const limit = 4;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
        query.title = { $regex: search, $options: "i" };
    }

    let sortQuery = {};
    if (sort === "rating_asc") sortQuery.rating = 1;
    if (sort === "rating_desc") sortQuery.rating = -1;
    if (sort === "year_asc") sortQuery.releaseYear = 1;
    if (sort === "year_desc") sortQuery.releaseYear = -1;

    const totalMovies = await Movie.countDocuments(query);
    const totalPages = Math.ceil(totalMovies / limit);

    const allMovies = await Movie.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit);

    res.render("movie", {
        allMovies,
        currentPage: Number(page),
        totalPages,
        search,
        sort
    });
};

exports.addMovie = async (req, res) => {
    await Movie.create({
        ...req.body,
        poster: req.file ? `/uploads/${req.file.filename}` : ""
    });
    res.redirect("/");
};

exports.deleteMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (movie.poster) {
        const imgPath = path.join(__dirname, "..", movie.poster);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/");
};

exports.editMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render("movie-edit", { movie });
};

exports.updateMovie = async (req, res) => {
    const oldMovie = await Movie.findById(req.params.id);

    if (req.file) {
        if (oldMovie.poster) {
            const oldImg = path.join(__dirname, "..", oldMovie.poster);
            if (fs.existsSync(oldImg)) fs.unlinkSync(oldImg);
        }
        req.body.poster = `/uploads/${req.file.filename}`;
    }

    await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
};
