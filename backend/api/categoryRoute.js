const express = require('express');
const app = express();
const categoryRoute = require('../routes/categoryRoute'); // Import from routes

app.use('/api/categories', categoryRoute); // Use the route logic

module.exports = app; // Export the serverless function
