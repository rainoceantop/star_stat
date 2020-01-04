const crypto = require('crypto')
const mongo = require('../libs/mongo')
const resp = require('../utils/resp')
const code = require('../constants/code')
const {ObjectID} = require('mongodb')
class User {
    static async register(req, res) {
        const {username, email, password, avatar} = req.body
        try {
            let user = await mongo.db.collection('user').findOne({ email })
            // 判断用户是否存在
            if (user) return res.json(resp(code.REQUEST_FAIL, '注册失败，用户已存在'))
            // 不存在，新增用户
            const result = await mongo.insert('user', {
                username: username,
                email: email,
                password: crypto.createHash('sha1').update(password).digest('hex'),
                avatar
            })
            req.session.user = result.ops[0]
            return res.json(resp(code.REQUEST_SUCCESS, result.ops[0]))
        } catch (error) {
            return res.json(resp(code.REQUEST_FAIL, '注册失败，后台错误'))
        }
    }
    static async login(req, res) {
        // 获取用户信息
        try {
            const email = req.body.email
            const password = req.body.password
            let user = await mongo.db.collection('user').findOne({ email })
            // 判断用户是否存在
            if (!user) return res.json(resp(code.REQUEST_FAIL, '登录失败，账号或密码错误'))
            // 用户存在，判断密码是否正确
            const password_sha1 = crypto.createHash('sha1').update(password).digest('hex')
            if (password_sha1 !== user.password) return res.json(resp(code.REQUEST_FAIL, '登录失败，账号或密码错误'))
            // 密码正确
            req.session.user = user
            Reflect.deleteProperty(user, 'password')
            return res.json(resp(code.REQUEST_SUCCESS, user))
        } catch (error) {
            return res.json(resp(code.REQUEST_FAIL, '登录失败，后台错误'))
        }
    }
    static isLogin(req, res) {
        let user = req.session.user
        Reflect.deleteProperty(user || {}, 'password')
        if (user) return res.json(resp(code.REQUEST_SUCCESS, user))
        return res.json(resp(code.REQUEST_FAIL, null))
    }
    static logout(req, res) {
        Reflect.deleteProperty(req.session, 'user')
        return res.json(resp(code.REQUEST_SUCCESS, '退出登录成功'))        
    }
    static async userInfo(req, res) {
        // 获取用户信息
        try {
            const _id = req.body.uid
            let user = await mongo.db.collection('user').findOne({ _id: ObjectID(_id) })
            Reflect.deleteProperty(user, 'password')
            return res.json(resp(code.REQUEST_SUCCESS, user))
        } catch (error) {
            return res.json(resp(code.REQUEST_FAIL, '用户信息获取失败'))
        }
    }
    static async userUpdate(req, res) {
        // 获取用户信息
        try {
            console.log(req.body)
            const _id = req.session.user._id
            const {username, sex, introduction, hobbies} = req.body
            await mongo.db.collection('user').updateOne({_id: ObjectID(_id)}, {$set: {
                username, sex, introduction, hobbies
            }})
            return res.json(resp(code.REQUEST_SUCCESS, '用户更新成功'))
        } catch (error) {
            console.error(error)
            return res.json(resp(code.REQUEST_FAIL, '用户更新失败'))
        }
    }
}

module.exports = User