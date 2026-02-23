const mongoose = require("mongoose");

const exteracategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    exteraCategoryName: {
        type: String
    }
},
    {
        versionKey: false
    }
);
module.exports =
    mongoose.models.exteracategory ||
    mongoose.model("exteracategory", exteracategorySchema);