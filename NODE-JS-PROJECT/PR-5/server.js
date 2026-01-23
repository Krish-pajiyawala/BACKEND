const express = require("express");
const port = 8000;
const path = require("path");
const dbconnect = require("./config/dbconnection");
const movieRoutes = require("./routes/movie.routes");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dbconnect();

app.use("/", movieRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
