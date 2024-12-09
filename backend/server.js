const express = require("express")
const app = express()
require("dotenv").config()
const morgan=require('morgan')
const categoryRoute=require('./routes/categoryRoute')
const productRoute =require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
require('./db/connection')

const bodyParser=require('body-parser')

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/public/uploads',express.static('public/uploads'))

//routes
app.use('/api',categoryRoute)
app.use('/api',productRoute)
app.use('/api',userRoute)

const port = process.env.PORT || 5000

app.listen(port, ()=>{
  console.log(`Server started at port ${port}`)
})