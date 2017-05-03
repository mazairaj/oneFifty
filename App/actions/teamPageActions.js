export function populatePosts(){
  //Populate all of the workouts for a particular month
  return dispatch => {
    fetch("https://morning-taiga-46107.herokuapp.com/populatePosts", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      var posts = responseJson
      console.log("This is the one to look at", posts)
      dispatch()
    })
    .catch((err) => {
      console.log('error in populatedWorkouts -> ', err)
    });
  };
}

export function postedData(post) {
  return {
    type: "POSTED_DATA",
    post: post
  }
}
