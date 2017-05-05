"use strict";
var express = require('express');
var router = express.Router();
// var _ = require('underscore')
const Workout = require('../models/models').Workout;

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())
//Searches database for three dates. No longer in use
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
//Get the data for the full month. Sort the date seletions in redux
router.post('/getMonth', function(req, res){
  var month = req.body.month
  console.log(month)
  var monthWorkouts;
  var teamWorkouts;
  Workout.find({ "date": { "$regex": month, "$options": "i" } },function(err,docs) {
      console.log("docs?", docs)
      monthWorkouts = new Array(31);
      var date;
      var dateCopy;
      monthWorkouts.fill([])
      docs.forEach(function(workout){
        date = new Date(workout.date);
        date = date.getDate();
        dateCopy = [].concat(monthWorkouts[(date-1)])
        dateCopy.push(workout);
        monthWorkouts[date - 1] = dateCopy;
      })
      res.send(monthWorkouts)
  })
})
router.post('/findTeamWorkout', function(req, res) {
  var date = req.body.date.toDateString();
  Workout.findOne({ "date": date})
  .populate('workouts')
  .exec(function(err, teamWorkout){
    if (err) {
        console.log("THIS IS AN ERROR! ", err)
    } else {
      res.send(teamWorkout)
    }
  })
}

module.exports = router;
