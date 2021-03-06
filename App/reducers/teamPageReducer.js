var date = new Date()
export default function teamPage(state = {
  sortParameter: "",
  newsFeedCards: [
    {
      name: "Julian Mazaira",
      date: date.toDateString(),
      profileImg: "",
      postType: "",
      cardImg: 'https://one-fifty.s3.amazonaws.com/ac0884c6b5a7bfe44b3b4ace8274833d',
      bodyText: "Hey guys. Just thought you'd wanna checkout out my new workout Log. It's pretty good.",
      likes: [],
      comments: []
    },
    {
      name: "Joe Ebner",
      date: date.toDateString(),
      profileImg: "",
      postType: "",
      cardImg: 'https://one-fifty.s3.amazonaws.com/ac0884c6b5a7bfe44b3b4ace8274833d',
      bodyText: "Is weigh in still 160.0?",
      likes: [],
      comments: []
    },
    {
      name: "CF150",
      date: date.toDateString(),
      profileImg: "",
      postType: "",
      cardImg: 'https://one-fifty.s3.amazonaws.com/ac0884c6b5a7bfe44b3b4ace8274833d',
      bodyText: "Team, sprints just informed me that the oficial lightweight category has been converted to Rugby. Suit up tomorrow morning at 7am.",
      likes: [],
      comments: []
    },
    {
      name: "Jasper Liu",
      date: date.toDateString(),
      profileImg: "",
      postType: "",
      cardImg: null,
      bodyText: "Workout has been posted!",
      likes: [],
      comments: []
    }
  ]
}, action) {
  switch(action.type) {
    case "POSTED_DATA":
      return Object.assign({}, state, {
        newsFeedCards: [...[action.post], ...state.newsFeedCards]
      })
    default:
      return state;
  }
}
