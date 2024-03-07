import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config/config.js';
// import db from '../models';
import Trader from '../models/Trader';

dotenv.config();

class TraderController {
    static createTrader = async (req, res) => {
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
            res.status(201).json(trader);
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };

    static signin = async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body;

            // Find the trader by email
            const trader = await Trader.findOne({
                email
            });

            if (!trader) {
                return res.status(401).json({
                    error: 'Invalid email or password'
                });
            }

            const passwordMatch = await bcrypt.compare(password, trader.password);

            if (!passwordMatch) {
                return res.status(401).json({
                    error: 'Invalid email or password'
                });
            }

            // Generate a token for the authenticated trader
            const token = jwt.sign({
                id: trader._id
            }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).json({
                id: trader._id,
                email: trader.email,
                fname: trader.fname,
                businessName: trader.businessName,
                address: trader.address,
                accessToken: token
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };

    static getAllTraders = async (req, res) => {
        try {
            const traders = await Trader.find();
            res.json(traders);
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };

    static getTraderById = async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const trader = await Trader.findById(id);
            if (!trader) {
                return res.status(404).json({
                    error: 'Trader not found'
                });
            }
            res.json(trader);
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };

    static updateTrader = async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const {
                email,
                password,
                fname,
                businessName,
                address
            } = req.body;
            const trader = await Trader.findByIdAndUpdate(
                id, {
                    email,
                    password,
                    fname,
                    businessName,
                    address
                }, {
                    new: true
                }
            );
            if (!trader) {
                return res.status(404).json({
                    error: 'Trader not found'
                });
            }
            res.json(trader);
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };

    static deleteTrader = async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const trader = await Trader.findByIdAndDelete(id);
            if (!trader) {
                return res.status(404).json({
                    error: 'Trader not found'
                });
            }
            res.json({
                message: 'Trader deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };

    static deleteAllTraders = async (req, res) => {
        try {
            await Trader.deleteMany();
            res.json({
                message: 'All traders deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    };

    static createInventoryProduct = async (req, res) => {
        try {
            const trader = await Trader.findById(req.traders._id);
            const productId = req.product._id;
            const productTitle = req.products.productTitle;
            const productCategory = req.products.productCategory;
            const productDescription = req.products.productDescription;
            const productImage = req.products.productImage;
            const productPrice = req.products.productPrice;
            const productColor = req.products.productColor;
            const productSize = req.products.productSize;
            const productQuantity = req.body;
            const createdBy = req.user._id;

            const traderInventory = new trader.Inventory.push({
                productId,
                productTitle,
                productCategory,
                productDescription,
                productImage,
                productPrice,
                productColor,
                productSize,
                productQuantity,
                createdBy,
            });

            const inventory = await trader.Inventory.save();
            console.log(inventory);
            res.status(200).json(inventory);
        } catch (err) {
            res.status(500).json(err);
        }
    };
}

export {
    TraderController
};