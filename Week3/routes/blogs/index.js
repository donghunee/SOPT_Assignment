var express = require('express');
var router = express.Router();

router.use('/',require('./blogs'))
router.use('/blogs',require('./articles/index'))
module.exports = router;
