const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategoryName: {
        type: String
    }
},
{
    versionKey: false
}
);
module.exports =
    mongoose.models.subcategory ||
    mongoose.model("subcategory", subcategorySchema);