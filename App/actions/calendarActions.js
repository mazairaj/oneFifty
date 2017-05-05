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
      var monthWorkouts = responseJson;
      // var teamWorkouts = responseJson.teamWorkouts;
      dispatch(populateMonthData(monthWorkouts))
      // dispatch(populateTeamWorkouts(teamWorkouts))
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
      var workoutsMongo = workouts.map((workout) => {
        var keys = Object.keys(workout)
        keys = keys.slice(6, keys.length)
        var workoutMetrics = [];
        keys.forEach(key => {
          workoutMetrics.push({name: key, value: workout[key]})
        })
        var workoutObj = Object.assign({}, {
          athleteName: workout.name,
          weight: workout.weight,
          workoutName: workoutName,
          date: date,
          workoutMetrics: workoutMetrics
        })
        console.log(workoutObj)
        return workoutObj
      })
      return workoutsMongo
      console.log(workoutsMongo)
    })
    .then((workoutsMongo) => {
      var promises = [];
      workoutsMongo.forEach(workout => {
        console.log(workout)
        promises.push(
          fetch("https://morning-taiga-46107.herokuapp.com/postWorkoutMongo",{
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: workout.athleteName,
              workoutName: workout.workoutName,
              date: workout.date,
              weight: workout.weight,
              workoutMetrics: workout.workoutMetrics
            })
          })
        )
      })
      return Promise.all(promises)

    }).then(almostWorkoutArray => {
      return Promise.all(almostWorkoutArray.map(almostWorkout => almostWorkout.json()));
    }).then(workoutArray => {
      console.log("workoutArray", workoutArray)
      return workoutArray.map(workout => workout._id);
    }).then( idArray => {
      console.log("IDARRAY", idArray)
      fetch("https://morning-taiga-46107.herokuapp.com/postTeamWorkout",{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          workoutName: workoutName,
          date: date,
          idArray: idArray
        })
      })
    })
    .catch((err) => {
      console.log('error in populatedWorkouts -> ', err)
    });
  };
}
export function findTeamWorkout(date){
  //Populate all of the workouts for a particular month
  return dispatch => {
    fetch("https://morning-taiga-46107.herokuapp.com/findTeamWorkout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: date
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      var workouts = responseJson
      console.log("This is the one to look at", workouts)
    })
    .catch((err) => {
      console.log('error in findTeamWorkouts -> ', err)
    });
  }
}
function populateMonthData(workouts) {
  console.log("actions", workouts)
  return {
        type: 'POPULATE_MONTH_DATA',
        workouts: workouts
    };
}
function populateTeamWorkouts(workouts) {
  console.log("actions", workouts)
  return {
        type: 'POPULATE_TEAM_WORKOUTS',
        workouts: workouts
    };
}
