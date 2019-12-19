class ArticleMiddleware{
    static create(req, res, next) {
        next()
    }
}
module.exports = ArticleMiddleware