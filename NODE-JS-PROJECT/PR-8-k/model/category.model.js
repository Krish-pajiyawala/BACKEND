const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String
    },
    categoryImage:{
        type: String
    }
});

module.exports = mongoose.model('category', categorySchema);