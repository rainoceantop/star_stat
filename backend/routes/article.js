const express = require('express')
const router = express.Router()
const articleController = require('../controller/article')
const articleMiddleware = require('../middleware/article')

/* GET articles listing. */
router.post('/create', articleMiddleware.create, articleController.create)

module.exports = router
