const express = require('express');
const { addExteraCategoryPage, viewExteraCategory, addExteraCategory, deleteExteraCategory, editExteraCategoryPage, updateExteraCategory, getSubCategory } = require('../controller/exteracategory.controller');

const routes = express.Router();

routes.get("/subcategory/:id", getSubCategory);

routes.get("/add-exteracategory", addExteraCategoryPage);

routes.get("/view-exteracategory", viewExteraCategory);

routes.post("/add-exteracategory",  addExteraCategory);

routes.get("/delete-exteracategory/:id", deleteExteraCategory);

routes.get("/edit-exteracategory/:id", editExteraCategoryPage);

routes.post("/update-exteracategory/:id",  updateExteraCategory);


module.exports = routes;