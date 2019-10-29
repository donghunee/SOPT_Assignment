var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:idx/articles', function(req, res, next) {

  var idx = req.params.idx
  console.log(idx)
  var mysqlDB = require('../../mysql-db');
  mysqlDB.query('select * from article', function (err, rows, fields) {
    if (!err) {
        var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
            'fields : ' + JSON.stringify(fields);
        res.send(result);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});

router.post('/blogs', function(req, res, next) {
  var {
    title,
    idx
  } = req.body

  var mysqlDB = require('../../mysql-db');
  mysqlDB.query(`insert into blog (title,article_id) value ('${title}',${idx})`, function (err, result) {
    if (!err) {
        res.send(result);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});



router.put('/blogs', function(req, res, next) {
  var {
    title,
    pre
  } = req.body

  var mysqlDB = require('../../mysql-db');
  mysqlDB.query(`update blog set title = '${title}' where title = '${pre}'`, function (err, result) {
    if (!err) {

        res.send(result);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});

router.delete('/blogs', function(req, res, next) {
  var {
    title
  } = req.body

  var mysqlDB = require('../../mysql-db');
  mysqlDB.query(`delete from blog where title = '${title}'`, function (err, result) {
    if (!err) {
        res.send(result);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
  });
});

module.exports = router;
