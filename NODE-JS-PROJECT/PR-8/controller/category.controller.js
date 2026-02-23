const Category = require('../model/category.model');
const SubCategory = require("../model/subCategory.model");
const ExtraCategory = require("../model/exteraCategory.model");
const path = require('path');
const fs = require('fs');

exports.addCategoryPage = async (req, res) => {
    try {
        return res.render("category/addCategory")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.viewCategory = async (req, res) => {
    try {
        let categories = await Category.find();
        return res.render("category/viewCategory", { categories })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addCategory = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        await Category.create({
            ...req.body,
            categoryImage: imagePath
        });

        req.flash('success', 'Add Category Success');
        return res.redirect("/category/add-category")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.deleteCategory = async (req, res) => {
    try {

        let categoryId = req.params.id;
        let category = await Category.findById(req.params.id);

        if (category.categoryImage != '') {
            let filepath = path.join(__dirname, '..', category.categoryImage);
            try {
                await fs.unlinkSync(filepath)
            } catch (error) {
                console.log('Category Not Found!');
            }
        }
        await Category.findByIdAndDelete(req.params.id);
        await SubCategory.deleteMany({ categoryId: categoryId });
        await ExtraCategory.deleteMany({ categoryId: categoryId });
        req.flash('success', 'Datate category Success');
        return res.redirect("/category/view-category");
    } catch (error) {
        req.flash('error', 'Category Not Dalate!!');
        return res.redirect("/dashboard");
    }
}

exports.editCategoryPage = async (req, res) => {
    try {
        let categories = await Category.findById(req.params.id);
        req.flash('success', 'Edit Category Success');
        return res.render("category/editCategory", { categories })
    } catch (error) {
        req.flash('error', 'Category Not Edit!');
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.updateCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);

        if (!category) {
            console.log('category Not Found !');
            return res.redirect("/dashboard");
        }

        let filepath = category.categoryImage;

        if (req.file) {
            if (category.categoryImage != '') {
                let oldpath = path.join(__dirname, '..', category.categoryImage);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    console.log('old file is missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }
        await Category.findByIdAndUpdate(req.params.id, {
            ...req.body,
            categoryImage: filepath
        }, { new: true })

        req.flash('success', 'Update Category Success');
        return res.redirect("/category/view-category")

    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}