const mongo = require('../libs/mongo')
const resp = require('../utils/resp')
const code = require('../constants/code')
const {ObjectID} = require('mongodb')
class Article {
    static async create(req, res) {
        try {
            const title = req.body.title
            const content = req.body.content
            const result = await mongo.insert('article', {
                author: req.session.user._id,
                title, content
            })
            return res.json(resp(code.REQUEST_SUCCESS, result.ops))
        } catch (error) {
            console.error(error)
            return res.json(resp(code.REQUEST_FAIL, null))
        }
    }
    static async getArticle(req, res) {
        try {
            const article_id = req.params.id
            if(!article_id) return res.json(resp(code.REQUEST_FAIL, null))
            let result = await mongo.db.collection('article').findOne({_id: ObjectID(article_id)})
            console.log(result)
            return res.json(resp(code.REQUEST_SUCCESS, result))
        } catch (error) {
            console.error(error)
            return res.json(resp(code.REQUEST_FAIL, null))
        }
    }
    static async getSelfArticles(req, res) {
        try {
            const user = req.session.user
            if(!user) return res.json(resp(code.REQUEST_FAIL, null))
            let result = await mongo.find('article', {author: user._id})
            console.log(result)
            return res.json(resp(code.REQUEST_SUCCESS, result))
        } catch (error) {
            console.error(error)
            return res.json(resp(code.REQUEST_FAIL, null))
        }
    }
}

module.exports = Article