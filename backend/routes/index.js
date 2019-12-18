var express = require('express');
var router = express.Router();
const mongo = require('../libs/mongo')
const User = require('../controller/user')


/* GET home page. */
router.get('/', function(req, res) {
  console.log(user1 === user2)
  res.json({a: 'apple'})
});

module.exports = router;
