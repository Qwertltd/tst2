const express = require('express')
const router = express.Router()
const CategoryController = require('../Controllers/CategoryController')

//router.post('/create', CategoryController.create)

// router.put('/update:id', CategoryController.update)

router.get('/all', CategoryController.all)
router.get('/', CategoryController.getOne)

// router.delete('/delete/:id', CategoryController.delete)

module.exports = router