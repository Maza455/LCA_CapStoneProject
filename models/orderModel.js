import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    database: process.env.DB_Name,
    host: process.env.DB_HOST,
    user: process.env.DB_UserName,
    password: process.env.DB_UserPass
});

const createOrderTable = async () => {
    const connection = await pool.getConnection();
    await connection.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customer_id INT NOT NULL,
      product_id INT NOT NULL,
      created_by INT NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (created_by) REFERENCES users(id)
    );
  `);
    connection.release();
};

const addOrder = async (order) => {
    const {
        customer,
        products,
        createdBy
    } = order;
    const connection = await pool.getConnection();

    for (let product of products) {
        await connection.query(
            'INSERT INTO orders (customer_id, product_id, created_by) VALUES (?, ?, ?)',
            [customer, product, createdBy]);
    }

    connection.release();
};

const getOrderById = async (orderId) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
        'SELECT * FROM orders WHERE id = ?',
        [orderId]);
    connection.release();
    return rows[0];
};

export {
    createOrderTable,
    addOrder,
    getOrderById
};

export default Order;