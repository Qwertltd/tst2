const express = require('express')
const router = express.Router()
const ProductController = require('../Controllers/ProductController')

router.get('/all', ProductController.all)
router.get('/', ProductController.getDetails)
router.get('/images', ProductController.getImages)

module.exports = router