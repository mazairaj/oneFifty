export default function teamData(state = {
  teamName: "",
  teamPhoto: "",
  athletes: [],
  favoriteWorkouts: [
    {workoutName: "2K", workoutMetrics: [{name: "split1"},{name: "split2"},{name: "split3"},{name: "split4"},{name: "average"},{name: "Stroke Rate"}]},
    {workoutName: "3 x 10 (4\'3\'2\'1\')", workoutMetrics: [{name: "piece1"},{name: "piece2"},{name: "piece3"}, {name: "Average"}]},
    {workoutName: "1 Hour AFAP", workoutMetrics: [{name: "split1"},{name: "split2"},{name: "split3"},{name: "split4"},{name: "split5"},{name: "split6"},{name: "average"},{name: "Stroke Rate"}]}
  ]
}, action) {
  switch(action.type) {
    default:
      return state;
  }
}
