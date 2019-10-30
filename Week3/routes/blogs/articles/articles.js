var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:idx/articles', function(req, res, next) {

  var idx = req.params.idx
  console.log(idx)
  var mysqlDB = require('../../../mysql-db');
  mysqlDB.query(`select * from article where blog_id = '${idx}'`, function (err, rows, fields) {
    if (!err) {
        res.send(rows);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});

router.post('/:idx/articles', function(req, res, next) {
  
  var idx = req.params.idx
  console.log(idx)
  var {
    title
  } = req.body

  var mysqlDB = require('../../../mysql-db')

  mysqlDB.query(`insert into article (title,blog_id) value ('${title}',${idx})`, function (err, result) {
    if (!err) {
        res.send(result);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});





router.put('/:idx/articles', function(req, res, next) {

  var idx = req.params.idx

  var {
    title,
    pre
  } = req.body

  var mysqlDB = require('../../../mysql-db');
  mysqlDB.query(`update article set title = '${title}' where blog_id = ${idx} and title = '${pre}' `, function (err, result) {
    if (!err) {
        res.send(result);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});

router.delete('/:idx/articles', function(req, res, next) {
  var idx = req.params.idx
  
  var {
    title
  } = req.body

  var mysqlDB = require('../../../mysql-db')
  mysqlDB.query(`delete from article where blog_id = ${idx} and title = '${title}'`, function (err, result) {
    if (!err) {
        res.send(result);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});

module.exports = router;
