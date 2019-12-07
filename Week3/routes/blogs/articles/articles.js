var express = require('express');
var router = express.Router();

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.loadFromPath('./config/awsconfig.json');

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'modoctest',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname.split('.').pop());
        }
    })
});

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

router.post('/:idx/articles',upload.single('image') ,function(req, res, next) {

//   var arr = []
  
//   req.files.forEach(function(n){
//         arr.push("'"+n.location+"'")
//   })

  var idx = req.params.idx
  var {
    title
  } = req.body

  var mysqlDB = require('../../../mysql-db')

  mysqlDB.query(`insert into article (title,blog_id,image) value ('${title}',${idx},'${req.file.location}')`, function (err, result) {
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
