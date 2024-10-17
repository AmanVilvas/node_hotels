const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./db'); // Ensure MongoDB connection is established
require('dotenv').config(); 
// Use built-in express middleware for parsing JSON requests (instead of body-parser)
app.use(express.json()); // Replaces bodyParser.json()
 //isme agar env mai port hai to woh use karo warna 3000 hi karo 
// Import routes
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuRoutes'); // Ensure the path is correct

// Welcome route (optional)
app.get('/', (req, res) => {
    res.send('Hello, Welcome to my Hoteeel');
});

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes); // This should match the path used in Postman

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable for port if available
app.listen(PORT, () => {
    console.log(`Server is alive and listening on port ${PORT}`);
});
