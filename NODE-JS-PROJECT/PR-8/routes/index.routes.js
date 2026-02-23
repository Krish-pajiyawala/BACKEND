const express = require('express')
const { deshborad } = require('../controller/index.controller')
const passport = require('passport')
const routes = express.Router()

routes.get('/', passport.checkAuthentication, deshborad)

// sub routes 
routes.use('/admin', passport.checkAuthentication, require('./admin.routes'))
routes.use("/category", passport.checkAuthentication, require("./category.routes"));
routes.use("/subcategory", passport.checkAuthentication, require("./subcategory.routes"));
routes.use("/exteracategory", passport.checkAuthentication, require("./exteracategory.routes"));
routes.use("/product",passport.checkAuthentication, require("./product.routes"));  
routes.use("/web",passport.checkAuthentication, require("./web.routes"));  
routes.use('/user', require('./auth.routes'))
module.exports = routes 