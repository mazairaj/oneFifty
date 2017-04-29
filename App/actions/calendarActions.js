export function selectDay(date) {
  return {
    type: "POPULATE_WORKOUTS",
    date: date,
    dayOfMonth: date.getDate()
  }
}
export function swipeDate(date, index) {
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
  return {
    type: "TOGGLE_CLICK_FALSE",
    dateClicked: false
  }
}
export function getMonthData(month){
  return dispatch => {
    fetch("http://localhost:8080/getMonth", {
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
function populateMonthData(workouts) {
  console.log("actions", workouts)
  return {
        type: 'POPULATE_MONTH_DATA',
        workouts: workouts
    };
}
