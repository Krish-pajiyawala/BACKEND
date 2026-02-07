const express = require('express')
const { addblogpage, addblog, viewblogpage, singleviewblogpage, deleteblog, editblog, updateblog } = require('../controller/blog.controller')
const upload = require('../middalwear/imageUpload')
const routes = express.Router()

routes.get('/add-blog',addblogpage)
routes.post('/add-blog',upload.fields([{name:'authorImage',maxCount:1},{name:'blogImage',maxCount:1}]),addblog)
routes.get('/view-blog',viewblogpage)
routes.get('/view-blog/:id',singleviewblogpage)
routes.get('/delete-blog/:id',deleteblog)
routes.get('/edit-blog/:id',editblog)
routes.post('/update-blog/:id',upload.fields([{name:'authorImage',maxCount:1},{name:'blogImage',maxCount:1}]),updateblog)

module.exports = routes