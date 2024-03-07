import express from 'express';
import Product from '../models/products.js';
import Trader from '../models/trader.js';
// import { verifyTokenAndAuthorization } from "../middlewear/verifyToken";

const router = express.Router();

// Updating a Product
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const trader = await Trader.findById(req.Trader._id);
        const inInventory = traders.Inventory.some((prod) => prod.id === req.params.id);

        res.status(200).json(updatedInventory);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update items in the user's cart
router.put("/:id/cart", [auth, getProduct], async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const inCart = user.cart.some((prod) => prod._id == req.params.id);

    if (inCart) {
        product.quantity += req.body.quantity;
        const updatedUser = await user.save();

        try {
            res.status(201).json(updatedUser.cart);
        } catch (error) {
            res.status(500).json(console.log(error));
        }
    } else {
        try {
            let product_id = res.product._id;
            let title = res.product.title;
            let category = res.product.category;
            let img = res.product.img;
            let price = res.product.price;
            let quantity = req.body;
            let created_by = req.user._id;

            user.cart.push({
                product_id,
                title,
                category,
                img,
                price,
                quantity,
                created_by,
            });

            const updatedUser = await user.save();
            res.status(201).json(updatedUser.cart);
        } catch (error) {
            res.status(500).json(console.log(error));
        }
    }
});

// Delete a Product
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Clear the user's cart
router.delete("/:id/cart", [auth, getProduct], async (req, res, next) => {});

export {
    router
};