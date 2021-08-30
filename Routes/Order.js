const express = require('express')
const router = express.Router()
const OrderController = require('../Controllers/OrderController')

router.get('/api/getOrder', OrderController.getOrder)
router.get('/api/getOrders', OrderController.getOrders)

module.exports = router