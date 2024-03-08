import db from "../models";
import Trader from "../models/traderModel.js";

const checkDuplicateEmail = (req, res, next) => {
    // Email
    Trader.findOne({
        email: req.body.email
    }).exec((err, trader) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        if (trader) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicateEmail,
};

export default verifySignUp;