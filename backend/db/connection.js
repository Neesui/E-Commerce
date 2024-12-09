const mongoose = require("mongoose");
require('dotenv').config();  // Load environment variables from .env file

// Connect to MongoDB without deprecated options
mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
