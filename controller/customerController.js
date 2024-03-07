import db from "../models/customerModel.js";
const Customer = db.customer;

class CustomerController {
    static async createCustomer(req, res) {
        try {
            const {
                email,
                password,
                fname,
                deliveryAddress,
                contact
            } = req.body;
            const customer = new Customer({
                email,
                password,
                fname,
                deliveryAddress,
                contact
            });
            await customer.save();
            res.status(201).json({
                message: 'Customer created successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    static async getAllCustomers(req, res) {
        try {
            const customers = await Customer.find();
            res.json(customers);
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    static async getCustomerById(req, res) {
        try {
            const {
                id
            } = req.params;
            const customer = await Customer.findById(id);
            if (!customer) {
                return res.status(404).json({
                    error: 'Customer not found'
                });
            }
            res.json(customer);
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    static async updateCustomer(req, res) {
        try {
            const {
                id
            } = req.params;
            const {
                email,
                password,
                fname,
                shippingAddress,
                contactNumber
            } = req.body;
            const customer = await Customer.findByIdAndUpdate(
                id, {
                    email,
                    password,
                    fname,
                    shippingAddress,
                    contactNumber
                }, {
                    new: true
                }
            );
            if (!customer) {
                return res.status(404).json({
                    error: 'Customer not found'
                });
            }
            res.json(customer);
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    static async deleteCustomer(req, res) {
        try {
            const {
                id
            } = req.params;
            const customer = await Customer.findByIdAndDelete(id);
            if (!customer) {
                return res.status(404).json({
                    error: 'Customer not found'
                });
            }
            res.json({
                message: 'Customer deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    static async deleteAllCustomers(req, res) {
        try {
            await Customer.deleteMany();
            res.json({
                message: 'All customers deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default {
    CustomerController
};