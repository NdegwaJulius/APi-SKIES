const db = require('../db');

class Product {
    // get all products
    static async getAllProducts() {
         const[rows] = await db.query('SELECT * FROM products');
         return rows;
    }
    // get product by id
    static async getProductById(id) {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    // get product by name
    static async getProductByName(name) {
        const [rows] = await db.query('SELECT * FROM products WHERE name = ?', [name]);
        return rows[0];
    }

    // add product
    static async addProduct(name, price) {
        const [rows] = await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
        return rows;
    }

    // update product
    static async updateProduct(id, name, price) {
        const [rows] = await db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id]);
        return rows;
    }

    // delete product
    static async deleteProduct(id) {
        const [rows] = await db.query('DELETE FROM products WHERE id = ?', [id]);
        return rows;
    }
    
}

module.exports = Product;