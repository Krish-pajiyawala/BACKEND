const express = require('express');

const { addSubCategoryPage, viewSubCategory, deleteSubCategory, updateSubCategory, editSubCategoryPage, addSubCategory } = require('../controller/subcategory.controller');

const routes = express.Router();

routes.get("/add-subcategory", addSubCategoryPage);

routes.get("/view-subcategory", viewSubCategory);

routes.post("/add-subcategory",  addSubCategory);

routes.get("/delete-subcategory/:id", deleteSubCategory);

routes.post("/update-subcategory/:id",  updateSubCategory);

routes.get("/edit-subcategory/:id", editSubCategoryPage);

module.exports = routes;