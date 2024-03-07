import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    database: process.env.DB_Name,
    host: process.env.DB_HOST,
    user: process.env.DB_UserName,
    password: process.env.DB_UserPass
});

const createProductTable = async () => {
    const connection = await pool.getConnection();
    await connection.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      p_name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(255),
      image VARCHAR(255),
      createdBy INT,
      FOREIGN KEY (createdBy) REFERENCES traders(id)
    );
  `);
    connection.release();
};

const addProduct = async (product) => {
    const {
        p_name,
        price,
        description,
        category,
        image,
        createdBy
    } = product;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
        'INSERT INTO products (p_name, price, description, category, image, createdBy) VALUES (?, ?, ?, ?, ?, ?)',
        [p_name, price, description, category, image, createdBy]);
    connection.release();
    return result.insertId;
};

const getProductById = async (productId) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
        'SELECT * FROM products WHERE id = ?',
        [productId]);
    connection.release();
    return rows[0];
};

export {
    createProductTable,
    addProduct,
    getProductById
};

export default Product;