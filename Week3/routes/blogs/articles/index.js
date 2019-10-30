var express = require('express');
var router = express.Router();

router.use('/',require('./articles'))
router.use('/:idx/articles', require('./comments/comments'))
module.exports = router;
