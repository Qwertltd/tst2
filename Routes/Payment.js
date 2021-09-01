const express = require('express')
const router = express.Router()
const PaymentController = require('../Controllers/PaymentController')

router.post('/payment', PaymentController.payment)

module.exports = router