const crypto = require('crypto')
const mongo = require('../libs/mongo')
const resp = require('../utils/resp')
const code = require('../constants/code')
class User {
    static async register(req, res) {
        const name = req.query.name
        const email = req.query.email
        const password = req.query.password
        try {
            let user = await mongo.db.collection('user').findOne({ email })
            // 判断用户是否存在
            if (user) return res.json(resp(code.REQUEST_FAIL, null))
            // 不存在，新增用户
            await mongo.insert('user', {
                name: name,
                email: email,
                password: crypto.createHash('sha1').update(password).digest('hex')
            })
            return res.json(resp(code.REQUEST_SUCCESS, null))
        } catch (error) {
            return res.json(resp(code.REQUEST_FAIL, null))
        }
    }
    static async login(req, res) {
        const email = req.query.email
        const password = req.query.password
        // 获取用户信息
        try {
            const user = await mongo.db.collection('user').findOne({ email })
            // 判断用户是否存在
            if(!user) return res.json(resp(code.REQUEST_FAIL, null))
            // 用户存在，判断密码是否正确
            const password_sha1 = crypto.createHash('sha1').update(password).digest('hex')
            if(password_sha1 !== user.password) return res.json(resp(code.REQUEST_FAIL, null))
            // 密码正确
            req.session.user = user
            return res.json(resp(code.REQUEST_SUCCESS, null))
        } catch (error) {
            return res.json(resp(code.REQUEST_FAIL, null))
        }
    }
}

module.exports = User