const mongo = require('../libs/mongo')
const resp = require('../utils/resp')
const code = require('../constants/code')
const { ObjectID } = require('mongodb')
class Article {
    static async create(req, res) {
        try {
            const user = req.session.user
            if (!user) return res.json(resp(code.REQUEST_FAIL, '创建失败，尚未登陆'))
            const title = req.body.title
            const content = req.body.content
            const result = await mongo.insert('article', {
                author: user._id,
                title, content
            })
            return res.json(resp(code.REQUEST_SUCCESS, result.ops))
        } catch (error) {
            console.error(error)
            return res.json(resp(code.REQUEST_FAIL, '创建失败，后台错误'))
        }
    }
    static async delete(req, res) {
        try {
            const user = req.session.user
            if (!user) return res.json(resp(code.REQUEST_FAIL, '删除失败，尚未登陆'))
            const { aid, author } = req.body
            if (author !== user._id) return res.json(resp(code.REQUEST_FAIL, '删除失败，文章只有自己的可以删除'))
            const result = await mongo.db.collection('article').deleteOne({ _id: ObjectID(aid), author: author })
            console.log(result.deletedCount)
            return res.json(resp(code.REQUEST_SUCCESS, '删除成功'))
        } catch (error) {
            console.error(error)
            return res.json(resp(code.REQUEST_FAIL, '删除失败，后台错误'))
        }
    }
    static async update(req, res) {
        try {
            const user = req.session.user
            if (!user) return res.json(resp(code.REQUEST_FAIL, '更新失败，尚未登陆'))
            const { aid, title, content, author } = req.body
            if (author !== user._id) return res.json(resp(code.REQUEST_FAIL, '更新失败，文章只有自己的可以更新'))
            const result = await mongo.db.collection('article').updateOne({ _id: ObjectID(aid) }, { $set: { title, content } })
            console.log(result)
            return res.json(resp(code.REQUEST_SUCCESS, '更新成功'))
        } catch (error) {
            console.error(error)
            return res.json(resp(code.REQUEST_FAIL, '更新失败，后台错误'))
        }
    }
    static async getArticle(req, res) {
        try {
            const article_id = req.params.id
            if (!article_id) return res.json(resp(code.REQUEST_FAIL, '查询失败，没有文章id'))
            let result = await mongo.db.collection('article').findOne({ _id: ObjectID(article_id) })
            console.log(result)
            return res.json(resp(code.REQUEST_SUCCESS, result))
        } catch (error) {
            console.error(error)
            return res.json(resp(code.REQUEST_FAIL, '查询失败，后台错误'))
        }
    }
    static async getSelfArticles(req, res) {
        try {
            const user = req.session.user
            if (!user) return res.json(resp(code.REQUEST_FAIL, '列表获取失败，尚未登陆'))
            let result = await mongo.find('article', { author: user._id })
            console.log(result)
            return res.json(resp(code.REQUEST_SUCCESS, result))
        } catch (error) {
            console.error(error)
            return res.json(resp(code.REQUEST_FAIL, '列表获取失败，尚未登陆'))
        }
    }
}

module.exports = Article