const express = require('express')
const router = express.Router()
const OrderController = require('../Controllers/OrderController')

router.get('/getOrder', OrderController.getOrder)
router.get('/getOrders', OrderController.getOrders)

module.exports = router