import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    database: process.env.DB_Name,
    host: process.env.DB_HOST,
    user: process.env.DB_UserName,
    password: process.env.DB_UserPass
});

const createUserTable = async () => {
    const connection = await pool.getConnection();
    await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `);
    connection.release();
};

const addUser = async (user) => {
    const {
        fname,
        email,
        password
    } = user;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
        'INSERT INTO users (fName, email, password) VALUES (?, ?, ?)',
        [fname, email, password]);
    connection.release();
    return result.insertId;
};

const getUserById = async (userId) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
        'SELECT * FROM users WHERE id = ?',
        [userId]);
    connection.release();
    return rows[0];
};

export {
    createUserTable,
    addUser,
    getUserById
};

export default User;