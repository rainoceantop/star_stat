const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
const UserMiddleware = require('../middleware/user')

/* GET users listing. */
router.post('/register', UserMiddleware.register, UserController.register)
router.post('/login', UserMiddleware.login, UserController.login)
router.post('/isLogin', UserMiddleware.isLogin, UserController.isLogin)
router.post('/logout', UserMiddleware.logout, UserController.logout)
router.post('/userInfo', UserMiddleware.userInfo, UserController.userInfo)
router.post('/userUpdate', UserMiddleware.userUpdate, UserController.userUpdate)
router.post('/modifyPassword', UserMiddleware.modifyPassword, UserController.modifyPassword)
module.exports = router
