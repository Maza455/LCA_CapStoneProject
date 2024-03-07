import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    database: process.env.DB_Name,
    host: process.env.DB_HOST,
    user: process.env.DB_UserName,
    password: process.env.DB_UserPass
});

const createCustomerTable = async () => {
    const connection = await pool.getConnection();
    await connection.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      item_name VARCHAR(255) NOT NULL,
      desc VARCHAR(255) NOT NULL,
      img VARCHAR(255),
      seller VARCHAR(255) NOT NULL
    );
  `);
    connection.release();
};

const addCustomer = async (customer) => {
    const {
        item_name,
        desc,
        img,
        seller
    } = customer;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
        'INSERT INTO customers (item_name, desc, img, seller) VALUES (?, ?, ?, ?)',
        [item_name, desc, img, seller]);
    connection.release();
    return result.insertId;
};

const getCustomerById = async (customerId) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
        'SELECT * FROM customers WHERE id = ?',
        [customerId]);
    connection.release();
    return rows[0];
};

export {
    createCustomerTable,
    addCustomer,
    getCustomerById
};

export default db;