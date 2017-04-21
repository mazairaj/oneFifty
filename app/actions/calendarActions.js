export function selectDay(dateSelect, nextDate, prevDate) {
  return dispatch => {
    fetch("http://localhost:8080/selectDay", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: dateSelect,
        prevDate: prevDate,
        nextDate: nextDate
      })
    })
    .then((response) => {
      console.log(response)
      return response.json()})
    .then((responseJson) => {
      console.log("Res", responseJson)
      var workouts = {
        ...responseJson
      }
      console.log("CALEDAR ACTIONS", workouts)
      var day = new Date(dateSelect)
      dispatch(populateWorkouts(workouts, day))
    })
    .catch((err) => {
      console.log('error in populatedWorkouts -> ', err)
    });
  };
}

function populateWorkouts(workouts, date) {
  console.log("actions", workouts, date)
  return {
        type: 'POPULATE_WORKOUTS',
        workouts: workouts,
        date: date,
        dateClicked: true
    };
}
export function toggleDateClickFalse(){
  return {
    type: "TOGGLE_CLICK_FALSE",
    dateClicked: false
  }
}
