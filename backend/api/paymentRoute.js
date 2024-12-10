const express = require('express');
const app = express();
const paymentRoute = require('../routes/paymentRoute'); // Import from routes

app.use('/api/payments', paymentRoute); // Use the route logic

module.exports = app; // Export the serverless function
