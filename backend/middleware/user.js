class UserMiddleware{
    static register(req, res, next) {
        next()
    }
    static login(req, res, next) {
        next()
    }
}
module.exports = UserMiddleware