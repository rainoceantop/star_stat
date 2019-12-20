const express = require('express')
const router = express.Router()
const articleController = require('../controller/article')
const articleMiddleware = require('../middleware/article')

/* GET articles listing. */
router.post('/create', articleMiddleware.create, articleController.create)
router.post('/getSelfArticles', articleMiddleware.getSelfArticles, articleController.getSelfArticles)
router.get('/getArticle/:id', articleMiddleware.getArticle, articleController.getArticle)

module.exports = router
