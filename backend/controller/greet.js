class Greet{
    hello(req, res) {
        res.json({
            greet: 'hello from backend api :)'
        })
    }
}

module.exports = Greet