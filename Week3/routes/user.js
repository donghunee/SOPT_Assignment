var express = require('express');
var router = express.Router();
const crypto = require("crypto");
var mysqlDB = require('../mysql-db')
var jwt = require('../module/jwt')

router.post('/sign_up',function(req,res,next){

    const {email, password} = req.body
    console.log(password)
    // let salt = Math.round((new Date().valueOf() * Math.random()));

    let salt = Math.round((new Date().valueOf() * Math.random())) + ""; 1231312314 + 승희

    console.log(salt)

    let hashPassword = crypto.createHash("sha512").update(password + salt).digest("hex");
    qwdhuiqwdhuqiwdhqiu
    
    console.log(hashPassword)

    mysqlDB.query(`insert into user (email,password,salt) value ('${email}','${hashPassword}',${salt})`, function (err, result) {
      if (!err) {
          const jsonWebToken = jwt.sign(email)
          res.json({
              jwt:jsonWebToken
          })
      } else {
          console.log('query error : ' + err);
          res.send(err);
      }
    });
})

router.post("/sign_in", async function(req,res,next){

    const {email,password} = req.body

    mysqlDB.query(`select * from user where email = '${email}' limit 1`, function (err, rows, fields) {
        if (!err) {
            const user = rows[0]
            let dbPassword = user.password;
            let inputPassword = password;
            let salt = user.salt;
            let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
            
            if(dbPassword === hashPassword){
            console.log("비밀번호 일치");
            const jsonWebToken = jwt.sign(email)
            res.json({message:jsonWebToken})
            }
            else{
            console.log("비밀번호 불일치");
            res.json({message:"야야 틀리다."})
            }
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
      });
  });

module.exports = router;
