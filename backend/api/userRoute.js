const express = require('express');
const app = express();
const userRoute = require('../routes/userRoute'); // Import from routes

app.use('/api/user', userRoute); // Use the route logic

module.exports = app; // Export the serverless function