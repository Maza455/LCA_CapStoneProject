import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    database: process.env.DB_Name,
    host: process.env.DB_HOST,
    user: process.env.DB_UserName,
    password: process.env.DB_UserPass
});

const db = {};

import roleModel from './role.model';
import userModel from './user.model';
import traderModel from './trader.model';
import customerModel from './customer.model';
import productsModel from './products.model';
import ordersModel from './orders.model';

db.pool = pool;
db.role = roleModel;
db.user = userModel;
db.trader = traderModel;
db.customer = customerModel;
db.products = productsModel;
db.orders = ordersModel;

export default db;