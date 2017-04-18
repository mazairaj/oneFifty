var mongoose = require('mongoose');

var athleteSchema = new mongoose.Schema({
  pastWorkouts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}],
  name: String,
  lineUp: [String]
})

var workoutSchema = new mongoose.Schema({
  workoutName: String,
  athleteName: String,
  date: Date,
  workoutMetrics: [
    {
    name: String,
    value: Number
    }
  ]
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

module.exports = {
  Athlete: Athlete,
  Workout: Workout,
}