const Product = require("../model/product.model");

exports.viewAllProduct = async (req, res) => {
    try {
        let products = await Product.find();
        return res.render("web/webPage", { products });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.singleProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        return res.render("web/singleProduct", { product })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addToCart = async (req, res) => {
    const id = req.params.id;
    let product = await Product.findById(id);

    if (!req.session.cart) {
        req.session.cart = [];
    }

    let exists = req.session.cart.find(item => item.id == id);

    if (!exists) {
        req.session.cart.push({
            id: product._id,
            productName: product.productName,
            productImage: product.productImage,
            price: product.productPrice,
            qty: 1
        });
    }

    res.redirect("/web/cart");
};

exports.viewCart = (req, res) => {
    let cart = req.session.cart || [];
    res.render("web/cart", { cart });
};

exports.incrementQty = (req, res) => {
    const id = req.params.id;
    let cart = req.session.cart;

    cart.forEach(item => {
        if (item.id == id) {
            item.qty += 1;
        }
    });

    res.redirect("/web/cart");
};

exports.decrementQty = (req, res) => {
    const id = req.params.id;
    let cart = req.session.cart;

    req.session.cart = cart.filter(item => {
        if (item.id == id) {
            item.qty -= 1;
            return item.qty > 0;
        }
        return true;
    });

    res.redirect("/web/cart");
};

exports.removeItem = (req, res) => {
    const id = req.params.id;
    req.session.cart = req.session.cart.filter(item => item.id != id);
    res.redirect("/web/cart");
};