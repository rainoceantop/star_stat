const crypto = require('crypto')
const mongo = require('../libs/mongo')
const resp = require('../utils/resp')
const code = require('../constants/code')
class User {
    static async register(req, res) {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        try {
            let user = await mongo.db.collection('user').findOne({ email })
            // 判断用户是否存在
            if (user) return res.json(resp(code.REQUEST_FAIL, null))
            // 不存在，新增用户
            const result = await mongo.insert('user', {
                username: username,
                email: email,
                password: crypto.createHash('sha1').update(password).digest('hex')
            })
            console.log(result.ops)
            req.session.user = result.ops[0]
            return res.json(resp(code.REQUEST_SUCCESS, result.ops[0]))
        } catch (error) {
            return res.json(resp(code.REQUEST_FAIL, null))
        }
    }
    static async login(req, res) {
        // 获取用户信息
        try {
            const email = req.body.email
            const password = req.body.password
            const user = await mongo.db.collection('user').findOne({ email })
            // 判断用户是否存在
            if(!user) return res.json(resp(code.REQUEST_FAIL, null))
            // 用户存在，判断密码是否正确
            const password_sha1 = crypto.createHash('sha1').update(password).digest('hex')
            if(password_sha1 !== user.password) return res.json(resp(code.REQUEST_FAIL, null))
            // 密码正确
            req.session.user = user
            return res.json(resp(code.REQUEST_SUCCESS, {
                email: user.email,
                username: user.username
            }))
        } catch (error) {
            return res.json(resp(code.REQUEST_FAIL, null))
        }
    }
}

module.exports = User