var mongoose = require('mongoose');

var athleteSchema = new mongoose.Schema({
  pastWorkouts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}],
  name: String,
  profileImage: String,
  lineUp: [String]
})

var workoutSchema = new mongoose.Schema({
  workoutName: String,
  athleteName: String,
  date: String,
  weight: Number,
  workoutMetrics: [
    {
    name: String,
    value: String
    }
  ]
})

var workoutMetricsSchema = new mongoose.Schema({
  workoutName: String,
  workoutMetrics: [
    {
    name: String,
    }
  ]
})

var teamDataSchema = new mongoose.Schema({
  teamName: String,
  teamPhoto: String,
  athletes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Athlete'}],
  favoriteWorkouts: [{type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutMetrics'}]
})

workoutSchema.virtual('metricsObject').get(function () {
  var metricsObject = {}
  this.workoutMetrics.forEach((array) => {
    metricsObject[array.name] = array.value
  });
  return metricsObject
});

var Athlete = mongoose.model("Athlete", athleteSchema);
var Workout = mongoose.model("Workout", workoutSchema);
var TeamData = mongoose.model("TeamData", teamDataSchema);
var WorkoutMetrics = mongoose.model("WorkoutMetrics", workoutMetricsSchema);

module.exports = {
  Athlete: Athlete,
  Workout: Workout,
  TeamData: TeamData,
  workoutMetricsSchema
}
