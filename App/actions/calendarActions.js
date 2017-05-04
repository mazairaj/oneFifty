//Actions associated with Calendar Page
var _ = require('underscore')
export function selectDay(date) {
  //Pull the workouts associated witha  certain day. Have them appear on a card Only visible
  //when a day is selected
  return {
    type: "POPULATE_WORKOUTS",
    date: date,
    dayOfMonth: date.getDate()
  }
}
export function swipeDate(date, index) {
  //Swipe between dates in card view. Swipe left for next day swipe right for previosu day
  console.log("Did something")
  var day = date.getDate();
  console.log(date, day, index)
  return {
    type: "CYCLE",
    date: date,
    dayOfMonth: day,
    index: index
  }
}
export function toggleDateClickFalse(){
  //Action called to exit card view
  return {
    type: "TOGGLE_CLICK_FALSE",
    dateClicked: false
  }
}
export function getMonthData(month){
  //Populate all of the workouts for a particular month
  return dispatch => {
    fetch("https://morning-taiga-46107.herokuapp.com/getMonth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        month: month
      })
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      var workouts = responseJson
      console.log("This is the one to look at", workouts)
      dispatch(populateMonthData(workouts))
    })
    .catch((err) => {
      console.log('error in populatedWorkouts -> ', err)
    });
  };
}
export function createTeamWorkout(workoutName, date){
  //Populate all of the workouts for a particular month
  return dispatch => {
    fetch("https://morning-taiga-46107.herokuapp.com/createTeamWorkout", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      var workouts = responseJson
      console.log("This is the one to look at", workouts)
      // var workoutsMongo = workouts.map((workout) => {
      //   var keys = Object.keys(workout)
      //   console.log(keys)
      //   var workoutObj = Object.assign({}, {
      //     athleteName: workout.name,
      //     weight: workout.weight,
      //     workoutName: workoutName,
      //     date: date
      //   },
      //   ...workoutMetrics
      // )
      //})
    })
    .catch((err) => {
      console.log('error in populatedWorkouts -> ', err)
    });
  };
}
function populateMonthData(workouts) {
  console.log("actions", workouts)
  return {
        type: 'POPULATE_MONTH_DATA',
        workouts: workouts
    };
}
