var express = require('express');
var router = express.Router();
const csv = require('csvtojson')
const json2csv = require('json2csv')
/* GET home page. */
const fs = require('fs')
router.get('/group', function(req, res, next) {

  csv().fromFile('./public/csv/members.csv').then((jsonArr) => {
    
    if (!jsonArr) {
    console.log(`file read err: ${err}`);
    return;
    }

    console.log(jsonArr);
    res.render('index', { body: JSON.stringify(jsonArr)});
  
    return jsonArr
    }, (err) => {
    console.log(`err with readCSV: ${err}`);
    })
});

router.get('/group/:groupIdx',function(req, res, next) {
  csv().fromFile('./public/csv/members.csv').then((jsonArr) => {
    if (!jsonArr) {
    console.log(`file read err: ${err}`);
    return;
    }

    var result = []
    for(var key in jsonArr) {
      if(req.params.groupIdx == jsonArr[key]['groupIdx']){
        result.push(jsonArr[key])
      }
    }
    var  idx = ""
    csv().fromFile('./public/csv/group.csv').then((groupArr) => {
      for(var key in groupArr) {
        if(req.params.groupIdx == groupArr[key]['groupIdx']){
          idx = groupArr[key]['name']
          console.log(idx)
          res.render('index', { body: JSON.stringify(result), idx:idx});
        }
      }
    })
    

    return jsonArr
    }, (err) => {
    console.log(`err with readCSV: ${err}`);
    })
})


router.get('/',function(req, res){
  csv().fromFile('./public/csv/members.csv').then((jsonArr) => {
    if (!jsonArr) {
    console.log(`file read err: ${err}`);
    return;
    }
    console.log(jsonArr);
    member = []
    for(var key in jsonArr) {
        member.push(jsonArr[key]["name"])
    }
    member = shuffle(member)

    for(var key in jsonArr) {
      if(jsonArr[key]["name"] !== member[key]){
        jsonArr[key]["name"] = member[key]
        member.slice(key,key+1)
      }
    }
    const resultCsv = json2csv.parse(jsonArr)
    fs.writeFileSync('./public/csv/members.csv', resultCsv);
    res.render('index', { body: JSON.stringify(jsonArr)});
  
    return jsonArr
    }, (err) => {
    console.log(`err with readCSV: ${err}`);
    })
})



function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


module.exports = router;
