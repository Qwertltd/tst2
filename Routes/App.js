const express = require('express')
const router = express.Router()
const AppController = require('../Controllers/AppController')

router.post('/createContactMessage', AppController.createContactMessage)
router.post('/createDesign', AppController.createDesign)
router.put('/updateDesign', AppController.updateDesign)
router.get('/getDesigns', AppController.getDesigns)
router.get('/getDesign', AppController.getDesign)

module.exports = router