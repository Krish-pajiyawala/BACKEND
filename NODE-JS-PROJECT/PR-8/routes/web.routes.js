const express = require('express');
const {  viewAllProduct, singleProduct, addToCart, viewCart, incrementQty, decrementQty, removeItem } = require('../controller/web.controller');

const routes = express.Router();

routes.get("/", viewAllProduct);

routes.get("/single-view/:id", singleProduct);

routes.post("/add-to-cart/:id", addToCart);

routes.get("/cart", viewCart);

routes.get("/cart/increment/:id", incrementQty);

routes.get("/cart/decrement/:id", decrementQty);

routes.get("/cart/delete/:id", removeItem);

module.exports = routes;