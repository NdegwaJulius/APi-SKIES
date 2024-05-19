// create an express server
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4500;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const userRoutes = require('./routes/users');
const productsRoute = require('./routes/products');


// Register Routes
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API!');
});

app.use('/users', userRoutes);
app.use('/products', productsRoute);


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});