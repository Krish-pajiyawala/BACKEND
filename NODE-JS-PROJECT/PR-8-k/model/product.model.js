const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    exteraCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exteracategory'
    },
    productName: {
        type: String
    },
    productPrice: {
        type: Number
    },
    productQuantity: {
        type: Number
    },
    brandName: {
        type: String
    },
    productDescription: {
        type: String
    },
    productImage: {
        type: String
    }
},
{
    versionKey: false
}
);

module.exports = mongoose.model('product', productSchema);