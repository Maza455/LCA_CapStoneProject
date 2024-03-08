import Order from "../models/orderModel.js";
import Controller from "./productsController.js";

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const {
            customer,
            products
        } = req.body;
        const order = new Order({
            customer,
            products
        });
        await order.save();
        res.status(201).json({
            message: 'Order created successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Get an order by ID
export const getOrderById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Update an order by ID
export const updateOrder = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            customer,
            products
        } = req.body;
        const order = await Order.findByIdAndUpdate(
            id, {
                customer,
                products
            }, {
                new: true
            }
        );
        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Delete an order by ID
export const deleteOrder = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }
        res.json({
            message: 'Order deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Delete all orders
export const deleteAllOrders = async (req, res) => {
    try {
        await Order.deleteMany();
        res.json({
            message: 'All orders deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export default Controller;