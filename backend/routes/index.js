var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session)
  res.json({a: 'apple'})
});

module.exports = router;
