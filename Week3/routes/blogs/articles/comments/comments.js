var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:idx/comments', function(req, res, next) {

  var idx = req.params.idx
  console.log(idx)
  var mysqlDB = require('../../../../mysql-db');
  mysqlDB.query(`select * from comment where article_id = '${idx}'`, function (err, rows, fields) {
    if (!err) {
        res.send(rows);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});

router.post('/:idx/comments', function(req, res, next) {
  
  var idx = req.params.idx
  console.log(idx)
  var {
    title
  } = req.body

  var mysqlDB = require('../../../../mysql-db')

  mysqlDB.query(`insert into comment (comment,article_id) value ('${title}',${idx})`, function (err, result) {
    if (!err) {
        res.send(result);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});





router.put('/:idx/comments', function(req, res, next) {

  var idx = req.params.idx

  var {
    title,
    pre
  } = req.body

  var mysqlDB = require('../../../mysql-db');
  mysqlDB.query(`update comment set title = '${title}' where article_id = ${idx} and comment = '${pre}' `, function (err, result) {
    if (!err) {
        res.send(result);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});

router.delete('/:idx/comments', function(req, res, next) {
  var idx = req.params.idx
  
  var {
    title
  } = req.body

  var mysqlDB = require('../../../mysql-db')
  mysqlDB.query(`delete from comment where article_id = ${idx} and title = '${title}'`, function (err, result) {
    if (!err) {
        res.send(result);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});

module.exports = router;
