const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// get all users
 router.get('/', async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
 });
 // get user by id
 router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.getUserById(id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
 });
 // get user by email
 router.get('/email/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.getUserByEmail(email);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
 });
 //update user by id
 router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.updateUserById(id, username, email, hashedPassword);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
 });
 // delete user by id
 router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.deleteUser(id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
 })

 // add user with the hashed password
 router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.createUser(username, email, hashedPassword);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
 
 })

module.exports = router;