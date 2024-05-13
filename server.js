// create an express server
const express = require('express');
const connection = require('./db');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 4500;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// users route
app.get('/users', async (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    })
});
// get used by id
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results[0]);
    })
});
// get user by email
app.get('/users/email/:email', async (req, res) => {
    const { email } = req.params;
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results[0]);
    })
});
// update user by id
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, hashedPassword, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'User updated successfully' });
    })
});
// add user
app.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'User added successfully' });
    })
});
// delete user by id
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    })
})
// products route
app.get('/products', async (req, res) => {
    connection.query('SELECT * FROM products', (err, results) => {
        if(err) {   
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});
// get product by id
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results[0]);
    })
});
// get product by name
app.get('/products/name/:name', async (req, res) => {
    const { name } = req.params;
    connection.query('SELECT * FROM products WHERE name = ?', [name], (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        //return results in json format
        res.json(results[0]);
    })
});
// add product
app.post('/products', async (req, res) => {
    const { name, price } = req.body;
    connection.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Product added successfully' });
    })
});
// update product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    connection.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id], (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Product updated successfully' });
    })
});
// delete product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Product deleted successfully' });
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
