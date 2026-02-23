const SubCategory = require('../model/subcategory.model');
const ExtraCategory = require("../model/exteraCategory.model");
const Category = require('../model/category.model')

exports.addSubCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.render("subcategory/addSubCategory", { categories })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.viewSubCategory = async (req, res) => {
    try {
        let categories = await Category.find();
        let subcategories = await SubCategory.find().populate('categoryId');
        // let subcategories = await SubCategory.find();
        return res.render("subcategory/viewSubCategory", { categories, subcategories })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addSubCategory = async (req, res) => {
    try {
        let subcategory = await SubCategory.create(req.body);

        if (!subcategory) {
            req.flash('error', ' Sub Category Not Added');
            return res.redirect("/subcategory/add-subcategory")
        }

        req.flash('success', 'Add Sub Category Success');
        return res.redirect("/subcategory/add-subcategory")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.deleteSubCategory = async (req, res) => {
    try {

        let subCategoryId = req.params.id;

        let subcategory = await SubCategory.findById(subCategoryId);

        if (!subcategory) {
            req.flash('error', 'Sub Category not found');
            return res.redirect("/subcategory/view-subcategory");
        }

        await ExtraCategory.deleteMany({ subCategoryId: subCategoryId })
        await SubCategory.findByIdAndDelete(req.params.id);

        req.flash('success', 'Detete Sub Category Success');
        return res.redirect("/subcategory/view-subcategory")
    } catch (error) {
        req.flash('error', 'Sub Category Not Dalate!!');
        return res.redirect("/dashboard");
    }
}

exports.editSubCategoryPage = async (req, res) => {
    try {
        let subcategories = await SubCategory.findById(req.params.id);

        req.flash('success', 'Edit Sub Category Success');
        return res.render("subcategory/editSubCategory", { subcategories })
    } catch (error) {
        req.flash('error', 'Sub Category Not Edit!');
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.updateSubCategory = async (req, res) => {
    try {

        await SubCategory.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, { new: true })

        req.flash('success', 'Update Sub Category Success');
        return res.redirect("/subcategory/view-subcategory")

    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}