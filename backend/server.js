// Importing the Express library, which is a web framework for Node.js
const express = require('express')

// Creating an instance of an Express application
const app = express()

// Importing the 'dotenv' library, which allows loading environment variables 
// from a '.env' file into the `process.env` object.
require('dotenv').config()

const morgan = require('morgan')
require('./db/connection')
const bodyParser = require('body-parser') // to handle json data if not provide cannot read json data
const cors = require('cors')

// Importing the categoryRoute module from the './routes/categoryRoute' file.
// This route will handle requests related to 'categories', which might include 
// things like fetching, creating, updating, or deleting categories.
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')
const paymentRoute = require('./routes/paymentRoute')

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json()) // to read json data
app.use('/public/uploads', express.static('public/uploads'))
app.use(cors({
    origin: process.env.FRONT_END_URL // Replace this with your client’s origin
  }));
// Using the `app.use()` middleware function to define the base path for the routes.
// In this case, the base URL for all routes defined in `categoryRoute` will be prefixed 
// with '/api'. 
// For example, if `categoryRoute` contains a route for fetching all categories, 
// the URL would be something like '/api/categories'.
// All requests that start with '/api' will be forwarded to `categoryRoute` for handling.
app.use('/api', categoryRoute)
app.use('/api', productRoute)
app.use('/api' ,userRoute)
app.use('/api', orderRoute)
app.use('/api', paymentRoute)


// app.use('/', (req,res)=>{
//       res.json({'message':'This is a express server'})
// })

// Defining the port the server will listen on.
// The `process.env.PORT` reads the 'PORT' environment variable, which could 
// be defined in a '.env' file or the system environment.
// If it's not set, it will default to port 5000 (due to the '|| 5000' part).
const port = process.env.PORT || 5000

// Starting the server and making it listen on the defined port.
// The `listen()` method takes the port and a callback function.
// When the server starts, the callback function is executed, 
// logging a message to the console.
app.listen(port, () => {
    // This log confirms that the server has started and tells you which port 
    // it's running on, based on the value of `port`.
    console.log(`Server started on port ${port}`)
})

module.exports = app;

