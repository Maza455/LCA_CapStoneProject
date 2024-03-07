import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    database: process.env.DB_Name,
    host: process.env.DB_HOST,
    user: process.env.DB_UserName,
    password: process.env.DB_UserPass
});

const createTraderTable = async () => {
    const connection = await pool.getConnection();
    await connection.query(`
    CREATE TABLE IF NOT EXISTS traders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fname VARCHAR(255) NOT NULL,
      cell VARCHAR(255),
      businessName VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      image VARCHAR(255) DEFAULT 'https://www.pngitem.com/pimgs/m/82-824451_transparent-supplier-icon-png-team-work-icon-transparent.png',
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      inventory JSON
    );
  `);
    connection.release();
};

const addTrader = async (trader) => {
    const {
        fname,
        cell,
        businessName,
        address,
        image,
        email,
        password
    } = trader;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
        'INSERT INTO traders (fname, cell, businessName, address, image, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [fname, cell, businessName, address, image, email, password]);
    connection.release();
    return result.insertId;
};

const getTraderById = async (traderId) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
        'SELECT * FROM traders WHERE id = ?',
        [traderId]);
    connection.release();
    return rows[0];
};

export {
    createTraderTable,
    addTrader,
    getTraderById
};

export default Trader;