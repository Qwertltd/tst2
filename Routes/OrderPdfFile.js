const express = require('express')
const router = express.Router()
const OrderPdfFileController = require('../Controllers/OrderPdfFileController')

router.post('/orderPdfFile', OrderPdfFileController.create)
router.get('/orderPdfFile/download', OrderPdfFileController.getDownload)
router.get('/orderPdfFile', OrderPdfFileController.getOne)
router.get('/orderPdfFile/byOrderId', OrderPdfFileController.getByOrderId)

module.exports = router