const mongo = require('../libs/mongo')
const resp = require('../utils/resp')
const code = require('../constants/code')
class Article {
    static async create(req, res) {
        try {
            console.log(req.session)
            const title = req.body.title
            const content = req.body.content
            const result = await mongo.insert('article', {
                author: req.session.user._id,
                title, content
            })
            console.log(result.ops)
            return res.json(resp(code.REQUEST_SUCCESS, result.ops))
        } catch (error) {
            return res.json(resp(code.REQUEST_FAIL, null))
        }
    }
}

module.exports = Article