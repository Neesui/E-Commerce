const express = require('express')
const { processPayment, sendStripeApi } = require('../controllers/paymentController')
const router = express.Router()

router.post('/process/payment', processPayment)
router.get('/stripeapi', sendStripeApi)

module.exports = router