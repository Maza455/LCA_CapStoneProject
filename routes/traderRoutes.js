import express from 'express';
import controller from '../controller/traderController.js';

const router = express.Router();

// Trader endpoints
router.post('/signUp', controller.createTrader); // ADD TRADER
router.post('/signIn', controller.signin); // ADD TRADER

router.get('/', controller.getAllTraders); // GET ALL TRADERS
router.get('/:id', controller.getTraderById); // GET 1 TRADER
router.patch('/:id', controller.updateTrader); // UPDATE 1 TRADER
router.delete('/deleteAll', controller.deleteAllTraders); // DELETE ALL TRADERS  
router.delete('/:id', controller.deleteTrader); // DELETE 1 TRADER
router.post("/:id", controller.createInventoryProduct); // Create Inventory Product

export {
    router
};