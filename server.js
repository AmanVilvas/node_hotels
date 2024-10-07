const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./db'); // Ensure MongoDB connection is established
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuRoutes'); // Ensure the path is correct

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Welcome route (optional)
app.get('/', (req, res) => {
    res.send('Hello Welcome to my Hotel');
});

// Use the routers
app.use('/person', personRoutes);
app.use('/menu-item', menuItemRoutes); // This should match the path used in Postman

// Start the server
app.listen(3000, () => {
    console.log('Server is alive and listening on port 3000');
});
