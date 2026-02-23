const SubCategory = require('../model/subcategory.model');
const Category = require('../model/category.model')
const ExteraCategory = require('../model/exteracategory.model');

exports.getSubCategory = async (req, res) => {
    try {
        let subCategories = await SubCategory.find({ categoryId: req.params.id });
        return res.json({massage: 'Subcategory Fetched', data: subCategories})
    } catch (error) {
        console.log(error);
        return res.json({ massage: 'Server Error', error: error.massage });
    }
}

exports.addExteraCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        const subcategories = await SubCategory.find();
        return res.render("exteracategory/addExteraCategory", { categories, subcategories })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.viewExteraCategory = async (req, res) => {
    try {
        let categories = await Category.find();
        // let subcategories = await SubCategory.find().populate('categoryId');
        let exteracategories = await ExteraCategory.find().populate('subCategoryId').populate('categoryId');
        return res.render("exteracategory/viewExteracategory", { categories, exteracategories })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addExteraCategory = async (req, res) => {
    try {
        let exteracategory = await ExteraCategory.create(req.body);

        if (!exteracategory) {
            req.flash('error', ' Extera Category Not Added');
            return res.redirect("/exteracategory/add-exteracategory");
        }

        req.flash('success', 'Add Extera Category Success');
        return res.redirect("/exteracategory/add-exteracategory")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.deleteExteraCategory = async (req, res) => {
    try {
        await ExteraCategory.findByIdAndDelete(req.params.id);

        req.flash('success', 'Delete Extera Category Success ');
        return res.redirect("/exteracategory/view-exteracategory")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.editExteraCategoryPage = async (req, res) => {
    try {
        let exteracategories = await ExteraCategory.findById(req.params.id);
        // req.flash('success', 'Delete Extera Category Success ');
        return res.render("exteracategory/editExteraCategory", { exteracategories })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.updateExteraCategory = async (req, res) => {
    try {
        await ExteraCategory.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, { new: true });

        req.flash('success', 'Update Extera Category Success ');
        return res.redirect("/exteracategory/view-exteracategory")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}