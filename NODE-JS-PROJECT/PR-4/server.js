const express = require("express");
const dbConnection = require("./config/dbconnection");
const Book = require("./model/book.model");

const app = express();
const port = 8000;
dbConnection();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    let books = await Book.find();
    return res.render("index", { books });
});

app.get("/deletebook/:id", async (req, res) => {
    let id = req.params.id;
    await Book.findByIdAndDelete(id);
    console.log("Book deleted successfully...");
    return res.redirect("/");
});

app.get("/editbook/:id", async (req, res) => {
    let id = req.params.id;
    let record = await Book.findById(id);
    return res.render("edit", { book: record });
});

app.post("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let updateData = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (updateData) {
        console.log("Book updated successfully...");
        return res.redirect("/");
    } else {
        console.log("Error updating book...");
        return res.redirect("back");
    }
});

app.post("/add-book", async (req, res) => {
    let book = await Book.create(req.body);
    if (book) {
        console.log("Book added successfully...");
        return res.redirect("/");
    } else {
        console.log("Error adding book...");
        return res.send("Something went wrong!");
    }
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
