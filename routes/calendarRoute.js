"use strict";
var express = require('express');
var router = express.Router();
// var _ = require('underscore')
const Workout = require('../models/models').Workout;

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

router.post('/selectDay', function(req, res){
  var dateSelect;
  var prevDate;
  var nextDate;
  var workoutObject = {}

  Workout.find({date: req.body.date}).sort('-createdAt')
  .exec(function (err, workouts){
    if (err) console.log('error is good');
    var todayWorkouts = [...workouts]
    workoutObject["dateSelect"]= todayWorkouts;
    return workoutObject
  }).then((response) => {
    Workout.find({date: req.body.prevDate}).sort('-createdAt')
    .exec(function (err, workouts){
      if (err) console.log('error is good');
      var prevWorkouts = [...workouts]
      workoutObject["prevDateObj"] = prevWorkouts;
      return workoutObject
    }).then((response) => {
      Workout.find({date: req.body.nextDate}).sort('-createdAt')
      .exec(function (err, workouts){
        if (err) console.log('error is good');
        var nextWorkouts = [...workouts]
        workoutObject["nextDateObj"] = nextWorkouts;
        return workoutObject
      }).then((response) => {
        console.log("response", workoutObject)
        res.send(workoutObject)
      })
    })
  })
})
module.exports = router;
