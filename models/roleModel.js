import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    database: process.env.DB_Name,
    host: process.env.DB_HOST,
    user: process.env.DB_UserName,
    password: process.env.DB_UserPass
});

const createRoleTable = async () => {
    const connection = await pool.getConnection();
    await connection.query(`
    CREATE TABLE IF NOT EXISTS roles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `);
    connection.release();
};

const addRole = async (role) => {
    const {
        name
    } = role;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
        'INSERT INTO roles (name) VALUES (?)',
        [name]);
    connection.release();
    return result.insertId;
};

const getRoleById = async (roleId) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
        'SELECT * FROM roles WHERE id = ?',
        [roleId]);
    connection.release();
    return rows[0];
};

export {
    createRoleTable,
    addRole,
    getRoleById
};