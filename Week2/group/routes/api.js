var express = require('express');
var router = express.Router();
const json2csv = require('json2csv')
const csv = require('csvtojson')

/* GET home page. */
const fs = require('fs')


const memberColor = [
  "#6633FF",
  "#00FF33",
  "#FF99FF",
  "#FF6666",
  "#CCFF99",
  "#0066CC"
]

router.get('/group', function(req, res, next) {

  csv().fromFile('./public/csv/members.csv').then((jsonArr) => {
    
    if (!jsonArr) {
    console.log(`file read err: ${err}`);
    return;
    }
    var result = []
    for (var i=1;i<7;i++) {
      var init = []
      for (key in jsonArr) {
        if (jsonArr[key]["groupIdx"] == String(i)) {
          init.push(jsonArr[key])
        }
      }
      result.push(init)
    }
    console.log(result[0])

    res.render('index', { body: result, color:memberColor});
  
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
          console.log(result)
          console.log(idx)
          res.render('detail', { body: result, idx:idx, color:memberColor[key]});
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

    var result = []
    for (var i=1;i<7;i++) {
      var init = []
      for (key in jsonArr) {
        if (jsonArr[key]["groupIdx"] == String(i)) {
          init.push(jsonArr[key])
        }
      }
      result.push(init)
    }
    console.log(result)


    res.json({ body: result});
  
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
