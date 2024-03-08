import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config/config.js';
// import db from '../models';
import Product from '../models/productModel.js';
import Trader from '../models/traderModel.js';

dotenv.config();

class ProductsController {
    static createProduct = async (req, res) => {
        try {
            const {
                fname,
                cell,
                businessName,
                address,
                image,
                email,
                password
            } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const trader = new Trader({
                fname,
                cell,
                businessName,
                address,
                image,
                email,
                password: hashedPassword,
            });

            await trader.save();
            console.log(trader);

            const product = new Product(req.body);

            if (req.body.createdBy) {
                const trader = await Trader.findOne({
                    fname: req.body.createdBy
                });
                if (!trader) {
                    return res.status(404).send({
                        message: "Trader not found."
                    });
                }
                product.createdBy = trader._id;
            }

            const savedProduct = await product.save();
            if (!savedProduct) {
                return res.status(500).send({
                    message: "The product was not created."
                });
            }

            res.send({
                message: "Product created successfully!"
            });
        } catch (err) {
            res.status(500).send({
                message: err.message
            });
        }
    };

    static getProductsByCreatedBy = async (req, res) => {
        try {
            const createdBy = req.params.createdBy;
            const trader = await Product.findOne({
                createdBy
            });
            if (!trader) {
                return res.status(404).json({
                    error: 'Trader not found'
                });
            }
            const products = await Product.find({
                createdBy: trader.fname
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };

    static getAllProducts = async (req, res) => {
        try {
            let category = req.params.category;
            let condition = category ? {
                category: {
                    $regex: new RegExp(category),
                    $options: 'i'
                }
            } : {}
            const products = await Product.find(condition);
            res.json(products);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };

    static getProductById = async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({
                    error: 'Product not found'
                });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };

    static updateProduct = async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const {
                p_name,
                price,
                description
            } = req.body;
            const product = await Product.findByIdAndUpdate(
                id, {
                    p_name,
                    price,
                    description
                }, {
                    new: true
                }
            );
            if (!product) {
                return res.status(404).json({
                    error: 'Product not found'
                });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };

    static deleteProduct = async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({
                    error: 'Product not found'
                });
            }
            res.json({
                message: 'Product deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };

    static deleteAllProducts = async (req, res) => {
        try {
            await Product.deleteMany();
            res.json({
                message: 'All products deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };
}

export {
    ProductsController
};

export default Controller;