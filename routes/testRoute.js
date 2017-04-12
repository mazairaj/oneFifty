"use strict";
var express = require('express');
var router = express.Router();

const Workout = require('../models/models').Workout;


const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

router.get('/test', function(req, res){
  res.send('test')
});

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
