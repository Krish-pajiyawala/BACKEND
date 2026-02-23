const express = require('express');
const { addCategoryPage, viewCategory, addCategory, deleteCategory, updateCategory, editCategoryPage,  } = require('../controller/category.controller');
const uploadImage = require('../middalwear/imageUpload');

const routes = express.Router();

routes.get("/add-category", addCategoryPage);

routes.get("/view-category", viewCategory);

routes.post("/add-category", uploadImage.single('categoryImage'), addCategory);

routes.get("/delete-category/:id", deleteCategory);

routes.post("/update-category/:id", uploadImage.single('categoryImage'), updateCategory);

routes.get("/edit-category/:id", editCategoryPage);

module.exports = routes;