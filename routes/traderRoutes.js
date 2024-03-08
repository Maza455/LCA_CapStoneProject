import express from 'express';
import controller from '../controller/traderController.js';

const router = express.Router();

// Trader endpoints
router.post('/signUp', controller.createTrader);
router.post('/signIn', controller.signin);

router.get('/', controller.getAllTraders);
router.get('/:id', controller.getTraderById);
router.patch('/:id', controller.updateTrader);
router.delete('/deleteAll', controller.deleteAllTraders); 
router.delete('/:id', controller.deleteTrader);
router.post("/:id", controller.createInventoryProduct);

export default {
    router
};