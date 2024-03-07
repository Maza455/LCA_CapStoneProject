import express from 'express';
import controller from '../controller/customerController.js';

const router = express.Router();

// Customer endpoints
router.post('/customer-signup', controller.createCustomer); // ADD CUSTOMER
router.get('/get-all-customers', controller.getAllCustomers); // GET ALL CUSTOMERS
router.get('/:id', controller.getCustomerById); // GET 1 TRADER
router.put('/:id', controller.updateCustomer); // UPDATE 1 CUSTOMERS
router.delete('/deleteAll-customers', controller.deleteAllCustomers); // DELETE ALL CUSTOMERS
router.delete('/:id', controller.deleteCustomer); // DELETE 1 CUSTOMERS

export {
    router
};