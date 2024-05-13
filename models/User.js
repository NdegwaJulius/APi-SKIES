const db = require('../db');
const bcrypt = require('bcrypt');

class User {
    // get all users
    static async getAllUsers() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }
    // get user by id
    static async getUserById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }
    // get user by email
    static async getUserByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
    //update user by id
    static async updateUserById(id, username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [rows] = await db.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, hashedPassword, id]);
        return rows;
    }
    // add user with usename email and hash password
    static async createUser(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [rows] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        return rows;
    }
    // delete user by id
    static async deleteUser(id) {
        const [rows] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return rows;
        
    }
}

module.exports = User