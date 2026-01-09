const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect("mongodb+srv://Krish:krish2307@cluster0.ea2vnxb.mongodb.net/BookStore")
        .then(() => {
            console.log("Database connected successfully...");
        })
        .catch((err) => {
            console.error("Database connection error:", err);
        });
};

module.exports = dbconnect;
