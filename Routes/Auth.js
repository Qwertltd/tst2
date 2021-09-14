const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/AuthController')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/update', AuthController.update)

router.post('/refresh-token', AuthController.refreshToken)

router.delete('/logout', AuthController.logout)

router.post("/password-reset", AuthController.logout)

router.post("/password-reset/:userId/:token", AuthController.logout)

module.exports = router