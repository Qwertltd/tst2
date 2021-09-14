const express = require('express')
const router = express.Router()
const ProductController = require('../Controllers/ProductController')

router.get('/all', ProductController.all)
router.get('/', ProductController.getDetails)
router.get('/images', ProductController.getImages)
router.post('/create', ProductController.create)

module.exports = router