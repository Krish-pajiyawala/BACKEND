const SubCategory = require('../model/subcategory.model');
const Category = require('../model/category.model')
const ExteraCategory = require('../model/exteracategory.model');
const Product = require('../model/product.model');
const path = require('path');
const fs = require('fs');

exports.getSubCategory = async (req, res) => {
    try {
        let subCategories = await SubCategory.find({ categoryId: req.params.id });
        return res.json({ massage: 'Subcategory Fetched', data: subCategories })
    } catch (error) {
        console.log(error);
        return res.json({ massage: 'Server Error', error: error.massage });
    }
}

exports.getExteraCategory = async (req, res) => {
    try {
        let exteraCategories = await ExteraCategory.find({ categoryId: req.params.id });
        return res.json({ massage: 'Extera category Fetched', data: exteraCategories })
    } catch (error) {
        console.log(error);
        return res.json({ massage: 'Server Error', error: error.massage });
    }
}

exports.addProductPage = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.render("product/addProduct", { categories })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addProduct = async (req, res) => {
    try {

        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        let product = await Product.create({
            ...req.body,
            productImage: imagePath
        });

        req.flash('success', 'Add Product Success');
        return res.redirect("/product/add-product")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.viewProduct = async (req, res) => {
    try {
        let categories = await Category.find();
        let products = await Product.find();
        return res.render("product/viewProduct", { categories, products })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.singleView = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        return res.render("product/singleView", { product })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (product.productImage != '') {
            let filepath = path.join(__dirname, '..', product.productImage);
            try {
                await fs.unlinkSync(filepath)
            } catch (error) {
                console.log('Product Not Found!');
            }
        }
        await Product.findByIdAndDelete(req.params.id);

        req.flash('success', 'Delete Product Success ');
        return res.redirect("/product/view-product")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.editProductPage = async (req, res) => {
    try {
        let products = await Product.findById(req.params.id);

        return res.render("product/editProduct", { products })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let products = await Product.findById(req.params.id);

        if (!products) {
            console.log('Product Not Found !');
            return res.redirect("/dashboard");
        }

        let filepath = products.productImage;

        if (req.file) {
            if (products.productImage != '') {
                let oldpath = path.join(__dirname, '..', products.productImage);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    console.log('old file is missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }

        await Product.findByIdAndUpdate(req.params.id, {
            ...req.body,
            productImage: filepath
        }, { new: true })

        req.flash('success', 'Update Product Success');
        return res.redirect("/product/view-product");

    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}