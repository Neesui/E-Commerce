const express = require('express');
const app = express();
const orderRoute = require('../routes/orderRoute'); // Import from routes

app.use('/api/orders', orderRoute); // Use the route logic

module.exports = app; // Export the serverless function
