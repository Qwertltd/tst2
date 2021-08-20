const express = require('express')
const router = express.Router()
const SubCategoryController = require('../Controllers/SubCategoryController')

router.get('/all', SubCategoryController.all)
// router.get('/', SubCategoryController.getOne)

module.exports = router