const express = require('express');
const { getSubCategory, getExteraCategory, addProductPage, addProduct, viewProduct, deleteProduct, editProductPage, updateProduct, singleView } = require('../controller/product.controller');
const uploadImage = require('../middalwear/imageUpload');

const routes = express.Router();

routes.get("/subcategory/:id", getSubCategory);

routes.get("/exteracategory/:id", getExteraCategory);

routes.get("/add-product", addProductPage);

routes.post("/add-product", uploadImage.single('productImage'), addProduct);

routes.get("/view-Product", viewProduct);

routes.get("/delete-product/:id", deleteProduct);

routes.get("/edit-product/:id", editProductPage);

routes.post("/update-product/:id", uploadImage.single('productImage'), updateProduct);

routes.get("/single-view/:id", singleView);

module.exports = routes;