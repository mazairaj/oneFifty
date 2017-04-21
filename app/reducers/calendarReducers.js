const date = new Date()
export default function selectDay(state = {
  populatedWorkouts: {
    dateSelect: [],
    prevDateObj: [],
    nextDateObj: []
  },
  date: date.toDateString(),
  dateClicked: false,
  teamWorkoutDates: [],
  individualWorkoutDates: []
}, action) {
    switch(action.type) {
      case "POPULATE_WORKOUTS":
        return Object.assign({}, state, {
          populatedWorkouts: action.workouts,
          date: action.date,
          dateClicked: true
        })
      case "TOGGLE_CLICK_FALSE":
      return Object.assign({}, state, {
        dateClicked: false
      })
      default:
        return state;
    }
}
