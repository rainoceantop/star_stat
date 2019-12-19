var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.sessionID)
  
  res.json({a: 'apple'})
});

module.exports = router;
