import express from 'express';
import controller from '../controller/ordersController.js';

const router = express.Router();

// Orders endpoints
router.post('/add-order', controller.createOrder); // ADD ORDER
router.get('/get-all-orders', controller.getAllOrders); // GET ALL ORDERS
router.get('/:id', controller.getAllOrders); // GET ALL ORDERS
router.patch('/:id', controller.updateOrder); // UPDATE 1 ORDER
router.delete('/delete-all-orders', controller.deleteAllOrders); // DELETE ALL ORDERS
router.delete('/:id', controller.deleteOrder); // DELETE 1 ORDER

export {
    router
};