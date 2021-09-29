const express = require('express')
const router = express.Router()
const TemplateController = require('../Controllers/TemplateController')

router.get('/templates', TemplateController.all)

module.exports = router