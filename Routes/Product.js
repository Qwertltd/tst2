const express = require('express')
const router = express.Router()
const ProductController = require('../Controllers/ProductController')

router.get('/all', ProductController.all)
router.get('/related', ProductController.getRelatedProducts)
router.get('/', ProductController.getDetails)
router.get('/images', ProductController.getImages)
router.post('/create', ProductController.create)
router.post('/review/create', ProductController.createReview)
router.get('/reviews', ProductController.getReviews)

module.exports = router