const express = require('express')
const router = express.Router()
const articleController = require('../controller/article')
const articleMiddleware = require('../middleware/article')

/* GET articles listing. */
router.post('/create', articleMiddleware.create, articleController.create)
router.post('/getArticles/:uid', articleMiddleware.getArticles, articleController.getArticles)
router.get('/getArticle/:id', articleMiddleware.getArticle, articleController.getArticle)
router.post('/delete', articleMiddleware.delete, articleController.delete)
router.post('/update', articleMiddleware.update, articleController.update)

module.exports = router
