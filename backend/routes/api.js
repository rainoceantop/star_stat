const express = require('express')
const router = express.Router()
const Greet = new (require('../controller/greet'))

router.get('/hello', Greet.hello)

module.exports = router