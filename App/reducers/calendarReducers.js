const date = new Date()
var getDay = function(date, offset){
  var day = date.getDay() + offset;
  if (day === 7) {
    day = 0
  }
  if (day === -1) {
    day = 6
  }
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return days[day]
}
//called to find the given workouts on a day and define the previous and next date as well
export default function selectDay(state = {
  populatedWorkouts: [[],[],[]],
  orderDates:[{},{},{}],
  date: date,
  dateClicked: false,
  teamWorkoutDates: [],
  individualWorkoutDates: [],
  monthWorkouts: new Array(31)
}, action) {
    switch(action.type) {
      case "POPULATE_WORKOUTS":
      var day = action.dayOfMonth;
      var monthData = state.monthWorkouts;
      var currDate = monthData[day - 1];
      var prevDate = monthData[day -2];
      var nextDate = monthData[day]
        return Object.assign({}, state, {
          populatedWorkouts: [prevDate, currDate, nextDate, 1],
          orderDates: [{date: day - 1, day:getDay(action.date, -1) }, {date: day, day: getDay(action.date, 0)}, {date: day +1, day:getDay(action.date, 1) }],
          date: action.date,
          dateClicked: true
        })
      case "TOGGLE_CLICK_FALSE":
      return Object.assign({}, state, {
        dateClicked: false
      })
      case "CYCLE":
      var index = action.index
      var day = action.dayOfMonth;
      var monthData = state.monthWorkouts;
      var currDate = monthData[day - 1];
      var prevDate = monthData[day -2];
      var nextDate = monthData[day]
      var currOrder;
      var orderDates;
      //define the proper ordering in the cycle of three cards
      if (index == 2) {
        currOrder = [nextDate, prevDate, currDate, 2]
        orderDates = [{date: day + 1, day: getDay(action.date, + 1) }, {date: day - 1, day: getDay(action.date, - 1)}, {date: day , day:getDay(action.date, 0) }]
      } else if (index === 1) {
        currOrder = [prevDate, currDate, nextDate, 1]
        orderDates = [{date: day - 1, day: getDay(action.date, -1) }, {date: day, day: getDay(action.date, 0)}, {date: day +1, day:getDay(action.date, 1) }]
      } else if (index == 0) {
        currOrder = [currDate, nextDate, prevDate, 0]
        orderDates = [{date: day, day:getDay(action.date, 0) }, {date: day + 1, day: getDay(action.date, 1)}, {date: day - 1, day:getDay(action.date, -1) }]
      }
        return Object.assign({}, state,{
          populatedWorkouts: [...currOrder],
          orderDates: [...orderDates],
          date: action.date
        })
      case "POPULATE_MONTH_DATA":
        return Object.assign({}, state, {
          monthWorkouts: [...action.workouts]
        })
      default:
        return state;
    }
}
