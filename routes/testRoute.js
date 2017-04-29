"use strict";
var express = require('express');
var router = express.Router();
var _ = require('underscore')

const Workout = require('../models/models').Workout;

//GoogleSheets
var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('1EQivJ6AIqFxCCEvJVqw-34W3llXdrE4Qi9k_mjJgjco');
var sheet;
var creds = require('../My_Project_Cred');
var async = require('async')

//Authenticates credentials
doc.useServiceAccountAuth(creds, function(err, item){
  if (err) {
    console.log(err)
  } else {
    console.log("Authenticated")
  }
})

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

var callback = function(res, string){
  if (res) {
    console.log(res)
  }
  console.log(string)
}
var setAuth = function() {
  console.log("This is Doc: ", doc)
  doc.useServiceAccountAuth(creds)
  callback(null, "callback");
}
var workingWithCells = function() {
  console.log("<<<<<<<< Inside working cells >>>>>>")
  sheet.setHeaderRow(['name', 'split1', 'split2', 'split3', 'weight'], function(err, done){
    if (err) {
      console.log(err)
    } else {
      callback(null, "callback");
    }
  })
}
var getInfoAndWorksheets = function(){
  doc.getInfo(function(err, info) {
    console.log("<<<<<<<< Inside Get INfo >>>>>>")
    console.log('Loaded doc: '+info.title+' by '+info.author.email);
    sheet = info.worksheets[0];
    console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
    if(err) {
      console.log(err)
    } else {
      console.log("INFO", info);
    }
  });
}
var addRowData = function(){
  console.log('ADD ROW')
  sheet.addRow({
    "name" : req.body.name,
    "split1": req.body.piece1,
    "split2": req.body.piece2,
    "split3": req.body.piece3,
    "weight": req.body.weight
  }, function(err){
    if (err){
      console.log(err)
    } else {
      callback(null, 'callback')
    }
  })
}

//post information directly to spreadsheet
router.post('/postWorkoutSpreadsheet', function(req, res){
  var data = req.body.workoutData
  console.log("This is REQd", data)
  //async.series calls each function asynchronously in sequntial order
  async.series([
    function(callback) {
      doc.getInfo(function(err, info) {
        console.log("<<<<<<<< Inside Get INfo >>>>>>")
        console.log('Loaded doc: '+info.title+' by '+info.author.email);
        sheet = info.worksheets[0];
        console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
        console.log("INFO", info)      // do some stuff ...
        callback(null, 'one');
      })
    },
    function(callback) {
      console.log("<<<<<<<< Inside working cells >>>>>>")
      sheet.setHeaderRow(['name', 'split1', 'split2', 'split3', 'weight'], function(err, done){
        if (err) {
          console.log(err)
        } else {
          callback(null, "callback");
        }
      })
    },
    function(callback){
      console.log("In Get Cells")
      sheet.getRows(function(err, rows){
        if (err) {
          console.log("Error: ", err)
        } else {
          var index;
          rows.forEach(function(rowData, i) {

            if (rowData.name === data.name) {
              console.log(rowData.name)
              index = i;
            }
            // rows[i].save();
          });
          if (index) {
            rows[index].del(function(err, result){
              console.log("Rows", rows)
              callback(null, 'callback')
            });
          } else {
            console.log("Rows", rows)
            callback(null, 'callback')
          }
        }

      })
    },
    function(callback) {
      console.log('ADD ROW')
      sheet.addRow({
        "name" : data.name,
        "split1": data.piece1,
        "split2": data.piece2,
        "split3": data.piece3,
        "weight": data.weight
      }, function(err, rows){
        if (err){
          console.log(err)
        } else {
          console.log("added Row", rows)
          console.log("Done")
          callback(null, 'callback')
        }
      })
    }
  ])
})

router.post('/createWorkout', function(req, res){
  var workoutTitle = req.body.title;
  var athleteName = req.body.athleteName;
  var metricName1 = req.body.metricName1;
  var metricName2 = req.body.metricName2;
  var value1 = req.body.value1;
  var value2 = req.body.value2;

  var newWorkout = new Workout({
    workoutName: workoutTitle,
    athleteName: athleteName,
    workoutMetrics: [
      {
        name: metricName1,
        value: value1
      },
      {
        name: metricName2,
        value: value2
      }
    ]
  })

  newWorkout.save(function(err, workoutNew){
    if (err) {
      console.log('error has occur: ',  err)
    } else {
      console.log('Nice, you created a file')
      console.log(workoutNew);
    }

  }).then(() => {
    var metrics = newWorkout.metricsObject;
    console.log('Metrics', (metrics.split * 2.23))
    res.send(newWorkout.metricsObject)
  })
});
module.exports = router;
