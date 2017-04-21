export function selectDay(dateSelect, nextDate, prevDate, bool) {
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
      var workouts = {
        ...responseJson
      }
      var day = new Date(dateSelect)
      dispatch(populateWorkouts(workouts, day))
      if (bool){
        return dispatch(initalOrder(workouts))
      }
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
export function cycleOrder(currOrder, bool){
  var copy = [...currOrder];
  if (bool) {
    var end = copy.pop();
    copy.unshift(end)
  } else  {
    var start = copy.shift();
    copy.push(start)
  }
  return {
    type: "CYCLE",
    currOrder: copy
  }
}
export function initialOrder(object){
  return {
    type: "INITIAL",
    currOrder: [object.prevDateObj, object.dateSelect, object.nextDate]
  }
}
