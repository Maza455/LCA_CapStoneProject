import express from 'express';
import controller from '../controller/trader.controller';
import {
    verifyToken
} from '../middlewares/authJwt.js';

const router = express.Router();

router.post('/signup', controller.createTrader); // ADD TRADER
router.post('/signin', controller.signin); // ADD TRADER

// Protected route - Get a trader's profile
router.get('/profile', verifyToken, (req, res) => {
    // Access the authenticated trader's ID from req.decodedToken

    // Retrieve the trader's profile from the database based on traderId
    // Your implementation goes here

    res.json({
        message: 'Protected route - Trader profile'
    });
});

// Other trader routes...
// Your implementation goes here

export {
    router
};