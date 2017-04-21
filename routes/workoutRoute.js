"use strict";
var express = require('express');
var router = express.Router();
// var _ = require('underscore')
const Workout = require('../models/models').Workout;

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

router.post('/postWorkoutMongo', function(req, res){
  var data = req.body.workoutData;
  var newWorkout = new Workout({
    workoutName: req.body.workoutName,
    athleteName: req.body.name,
    date: req.body.date,
    weight: req.body.weight,
    workoutMetrics: req.body.metricObjects,

  })
  newWorkout.save(function(err, workoutNew){
    if (err) {
      console.log('error has occur: ',  err)
    } else {
      console.log('Nice, you created a file')
      console.log(workoutNew);
    }
  })
});

module.exports = router;
