var express = require('express');
var router = express.Router();

/* GET home page. */


router.use('/news',require('./news/index'))
router.use('/cafe',require('./cafe'))
router.use('/blog',require('./blog'))

module.exports = router;
