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

var postSchema = new mongoose.Schema({
  name: String,
  date: String,
  profileImg: String,
  postType: String,
  cardImg: String,
  bodyText: String,
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Athlete'}],
  //comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]

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
var Post = mongoose.model("Post", postSchema);

module.exports = {
  Athlete: Athlete,
  Workout: Workout,
  TeamData: TeamData,
  workoutMetricsSchema,
  Post: Post
}
