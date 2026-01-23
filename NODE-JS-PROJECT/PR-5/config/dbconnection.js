
const mongoose = require("mongoose");

const dbconnect = async () => {
    await mongoose.connect("mongodb+srv://Krish:krish2307@cluster0.ea2vnxb.mongodb.net/movie");
    console.log("MongoDB Connected");
};

module.exports = dbconnect;
