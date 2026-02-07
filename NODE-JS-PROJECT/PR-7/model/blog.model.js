const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
name:{
    type:String
},
title:{
    type:String
},
category:{
    type:String
},
status:{
    type:String
},
content:{
    type:String
},
authorImage:{
    type:String
},
blogImage:{
    type:String
},
date:{
    type:String
}
})


module.exports = mongoose.model('blogs',blogSchema)
