import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import {
    DB
} from './config/db.config';
// import mongoose from 'mongoose';

// import routes
import userRoutes from './routes/userRoutes';
import traderRoutes from './routes/traderRoutes';
import customerRoutes from './routes/customerRoutes';
import productsRoutes from './routes/productsRoutes';
import ordersRoutes from './routes/ordersRoutes';

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5555;

        this.middlewares();

        // import routes
        this.routes();

        this.db();

        this.listen();
    }

    middlewares() {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json({
            limit: '10mb'
        }));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        // import routes
        userRoutes(this.app);
        traderRoutes(this.app);
        customerRoutes(this.app);
        productsRoutes(this.app);
        ordersRoutes(this.app);
    }

    db() {
        mongoose.connect(DB.db_url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(console.log("Connected successfully"))
            .catch(err => {
                console.log("Error message : " + err);
            });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running @ ${this.port}.`);
        });
    }
}

new App();