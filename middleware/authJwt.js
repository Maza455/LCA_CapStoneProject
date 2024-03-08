import jwt from "jsonwebtoken";
import config from "../config/config.js";
// import db from "../models";
// import Trader from "../models/trader";
// import Product from "../models/product";

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.productId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken
};

export default authJwt;