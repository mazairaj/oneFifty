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
  individualWorkoutDates: [],
  currOrder: [[],[],[]]
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
      case "Cycle":
        return Object.assign({}, state,{
          currOrder: [...action.currOrder]
        })
      case: "INITIAL":
        return Object.assign({}, state, {
          currOrder: [...action.currOrder]
        })
      default:
        return state;
    }
}
