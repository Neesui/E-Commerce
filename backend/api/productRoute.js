const express = require('express');
const app = express();
const productRoute = require('../routes/productRoute'); // Import from routes

app.use('/api/product', productRoute); // Use the route logic

module.exports = app; // Export the serverless function
