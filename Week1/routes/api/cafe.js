var express = require('express');
var router = express.Router();

/* GET home page. */



router.get('/', function(req, res, next) {
  res.send('카페입니다.')
});

module.exports = router;
