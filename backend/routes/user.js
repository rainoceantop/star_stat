const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
const UserMiddleware = require('../middleware/user')

/* GET users listing. */
router.get('/register', UserMiddleware.register, UserController.register)
router.get('/login', UserMiddleware.login, UserController.login)

module.exports = router
