import { View, Text, StyleSheet, TabBarIOS, TouchableOpacity, Image, ScrollView, ListView} from 'react-native';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Right, Left, Thumbnail, List, ListItem, Body, Header, Badge, Button} from 'native-base';
import { Icon } from 'react-native-elements'
import Calendar from 'react-native-calendar'
import Swiper from 'react-native-swiper';

// import FontAwesome from "react-native-vector-icons/Fonts/FontAwesome.ttf"
// import IonIcons from "react-native-vector-icons/Fonts/Ionicons.ttf"
// import MaterialIcons from "react-native-vector-icons/Fonts/MaterialIcons.ttf"

import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/calendarActions';


var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

const dates = [null];
const date = new Date();

class WorkoutCalendar extends Component {
  swiper = Object;
  constructor(props) {
    super(props);
  }

// Action called when date is selected on the calandar
  onDateSelect(date) {
    const {actions} = this.props
    var dateSelect = new Date(date)
    // console.log(dateSelect.toDateString(), nextDate.toDateString(), prevDate.toDateString())
    actions.selectDay(dateSelect);
  }
// Used to get day of week as string
  getDay(date, offset){
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

  componentDidMount() {
    // console.log("Props", this.props)
    const { actions, calendarState } = this.props;
    var date = calendarState.date.toDateString();
    var month = date.slice(4,7);
    actions.getMonthData(month)
    actions.findTeamWorkout(date);
  }
  componentWillUnmount(){
    const { actions, calendarState } = this.props;
    if (calendarState.dateClicked) {
      actions.toggleDateClickFalse();
    }

  }
  _onMomentumScrollEnd(evt, state, context) {
    const { actions, calendarState } = this.props;
    var index = this.swiper.state.index;
    var prevIndex =  calendarState.populatedWorkouts[3];
    var offset;
    if (index - prevIndex === 1) {
      offset = 1;
    } else if (index - prevIndex === -1) {
      offset = -1
    } else if (index === 0 && prevIndex === 2){
      offset = 1
    } else if (index === 2 && prevIndex === 0) {
      offset = -1
    }

    var date = calendarState.date;
    date.setDate(date.getDate() + offset);
    actions.swipeDate(date, index)
  }
  monthSwipeRight(){
    console.log(this.props)
  }
  selectWorkout(val){
    const {navigate} =this.props.navigation
    // console.log("VAL", this.props)
    navigate("WorkoutData", {...val})
  }
  postTeamWorkout(){
    const { actions, calendarState } = this.props;
    console.log(calendarState)
    actions.createTeamWorkout("2K", calendarState.date.toDateString())
  }
  selectTeamWorkout(workouts, workoutName, date){
    var imgs = ['https://scontent.fsnc1-2.fna.fbcdn.net/v/t1.0-9/18157726_10212398202333370_7410206059461750311_n.jpg?oh=67d5fc84421179bc233db036a4ff8fc4&oe=597B0D20', 'https://scontent.fsnc1-2.fna.fbcdn.net/v/t1.0-9/15355751_10207915944518305_4209451001268897569_n.jpg?oh=885bd3286a077c0b4c772616b59082bd&oe=59BE0975', 'https://scontent.fsnc1-2.fna.fbcdn.net/v/t1.0-9/12439023_10206114395882164_3964247135252667796_n.jpg?oh=f3ca694d5c29666127ad5c348b3caca6&oe=5979CC62', 'https://scontent.fsnc1-2.fna.fbcdn.net/v/t1.0-9/13659104_10208680207936419_3237701144618357978_n.jpg?oh=97971221b8129a6217ea74db3de734df&oe=59BB5B5F']
    var i = 0
    var workouts = workouts.map(workout => {
      var copy = Object.assign({}, workout, {img: imgs[i]})
      i++;
      console.log(copy)
      return copy;
    })
    console.log("THIS ONE STUPID", workouts)
    const {navigate} =this.props.navigation
    // console.log("VAL", this.props)
    navigate("WorkoutRanking", {workouts:[...workouts], workoutName:workoutName, date: date })
  }
  render(){
    const {actions, calendarState} = this.props;
    const config = {
      velocityThreshold: 0.15,
      directionalOffsetThreshold: 20
    };
    console.log("CS", this.props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    var date = calendarState.orderDates[1];
    var datePrev = calendarState.orderDates[0];
    var dateNext = calendarState.orderDates[2];
    //This is ONLY FOR THE DEMO. DATE IS WRONG FOR EVERY OTHER DAY
    //
    //
    //
    var header = calendarState.teamWorkouts;
    const dataSource = ds.cloneWithRows(calendarState.populatedWorkouts[1])
    const dataSourcePrev = ds.cloneWithRows(calendarState.populatedWorkouts[0])
    const dataSourceNext = ds.cloneWithRows(calendarState.populatedWorkouts[2])
    return(
      <View style={{flex: 1}}>
        <View style = {{flex:1}}>
          <TouchableOpacity onPress={() =>{
            if (calendarState.dateClicked) {
              //exit select Date Card
              actions.toggleDateClickFalse();
            }
          }}>
            <Calendar
              currentMonth={'2017-04-01'}       // Optional date to set the currently displayed month after initialization
              customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
              eventDates={['2017-04-01']}       // Optional array of moment() parseable dates that will show an event indicator
              events={[{date:'2017-04-01'}]}// Optional array of event objects with a date property and custom styles for the event indicator
              nextButtonText={'Next'}           // Text for next button. Default: 'Next'
              onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
              onSwipeNext={() => {
                this.monthSwipeRight();
                this.onSwipeNext}}    // Callback for forward swipe event
              onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
              onTouchNext={this.onTouchNext}    // Callback for next touch event
              onTouchPrev={this.onTouchPrev}    // Callback for prev touch event<Image source={require('./my-icon.png')} />
              prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
              scrollEnabled={true}              // False disables swiping. Default: False
              selectedDate={'2015-04-01'}       // Day to be selected
              showControls={true}               // False hides prev/next buttons. Default: False
              showEventIndicators={true}        // False hides event indicators. Default:False
              startDate={'2017-04-01'}          // The first month that will display. Default: current month
              titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
              today={'2017-04-21'}              // Defaults to today
              weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
            />
          </TouchableOpacity>
        </View>
          {calendarState.dateClicked ? (
            //Render Card View. Card View is split up into a three separate cards. Current date, previous date
            //and next date are always rendered. Redux state changes are used to keep
            //the current date card in the middle of the the deck of three.
            <View style={styles.overlay}>
              <Swiper
               horizontal = {true}
               loop = {true}
               showsPagination = {false}
               index = {1}
               onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
               ref={component => this.swiper = component}
               >
              <View style= {styles.overlay}>
                <Card>
                  <Content
                    horizontal = {false}>
                    <CardItem header>
                      <Left>
                        <View>
                          <Text style={{fontWeight: 'bold', fontSize: 20}}>{datePrev.date}</Text>
                          <Text>{datePrev.day}</Text>
                        </View>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <View style={{width: width}}>
                        <List>
                        <ScrollView>
                        <ListView
                         dataSource = {dataSourcePrev}
                         renderRow={(val) =>
                           <ListItem>
                            <Thumbnail style={{marginTop: 5, marginRight: 10, height: 36, width: 36, borderRadius: 18}} source={require('../../assets/image/Simulator.png')} />
                            <Body>
                              <Text>{val.workoutName}</Text>
                              <Text>{val.athleteName}</Text>
                            </Body>
                            <Right style={{justifyContent: 'center'}}>
                              <TouchableOpacity onPress={()=>console.log("Pressed")}>
                              <Icon  name='rowing' />
                              </TouchableOpacity>
                            </Right>
                          </ListItem>
                        }/>
                        </ScrollView>
                        </List>
                      </View>
                    </CardItem>
                  </Content>
                </Card>
              </View>
              <View style= {styles.overlay}>
                <Card>
                  <Content
                    horizontal = {false}>
                    <CardItem header>
                    <Left>
                      <View>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>{date.date}</Text>
                        <Text>{date.day}</Text>
                      </View>
                    </Left>
                    </CardItem>
                      <CardItem cardBody>
                        <View style={{width: width}}>
                        <List>
                          <ScrollView>
                            <ListView
                             dataSource = {dataSource}
                             renderHeader ={() =>
                               <ListItem>
                                <Thumbnail style={{marginTop: 5, marginRight: 10, height: 36, width: 36, borderRadius: 18}} source={require('../../assets/image/Simulator.png')} />
                                <Body>
                                  <Text>{header.workoutName}</Text>
                                  <Text>TEAM WORKOUT</Text>
                                </Body>
                                <Right style={{justifyContent: 'center'}}>
                                  <TouchableOpacity onPress={this.selectTeamWorkout.bind(this, header.workouts, header.workoutName, header.date)}>
                                  <Icon  name='rowing' />
                                  </TouchableOpacity>
                                </Right>
                              </ListItem>}
                             renderRow={(val) =>
                               <ListItem>
                                <Thumbnail style={{marginTop: 5, marginRight: 10, height: 36, width: 36, borderRadius: 18}} source={require('../../assets/image/Simulator.png')} />
                                <Body>
                                  <Text>{val.workoutName}</Text>
                                  <Text>{val.athleteName}</Text>
                                </Body>
                                <TouchableOpacity onPress={this.selectWorkout.bind(this, val)}>
                                  <Right style={{justifyContent: 'center'}}>
                                  <Icon  name='rowing' />
                                  </Right>
                                </TouchableOpacity>
                              </ListItem>
                          }/>
                          </ScrollView>
                        </List>
                        </View>
                    </CardItem>
                  </Content>
                </Card>
              </View>
              <View style= {styles.overlay}>
                <Card>
                  <Content
                    horizontal = {false}>
                    <CardItem header>
                      <Left>
                        <View>
                          <Text style={{fontWeight: 'bold', fontSize: 20}}>{dateNext.date}</Text>
                          <Text>{dateNext.day}</Text>
                        </View>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <View style={{width: width}}>
                        <List>
                          <ScrollView>
                            <ListView
                             dataSource = {dataSourceNext}
                             renderRow={(val) =>
                               <TouchableOpacity onPress={()=>console.log("Pressed")}>
                                 <ListItem>
                                  <Thumbnail style={{marginTop: 5, marginRight: 10, height: 36, width: 36, borderRadius: 18}} source={require('../../assets/image/Simulator.png')} />
                                  <Body>
                                    <Text>{val.workoutName}</Text>
                                    <Text>{val.athleteName}</Text>
                                  </Body>
                                    <Right style={{justifyContent: 'center'}}>
                                    <Icon  name='rowing' />
                                    </Right>
                                </ListItem>
                              </TouchableOpacity>
                            }/>
                          </ScrollView>
                        </List>
                      </View>
                    </CardItem>
                  </Content>
                </Card>
              </View>
              </Swiper>
            </View>) : null}
            <Button style={{
              height: 36,
              margin: 10,
              backgroundColor: '#48BBEC',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 10,
              alignSelf: 'stretch',
              justifyContent: 'center'
            }}
            onPress={this.postTeamWorkout.bind(this)}><Text>Post Team Workout</Text></Button>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  // Flex to fill, position absolute,
  // Fixed left/top, and the width set to the window width
  overlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: width,
    height: 400,
    marginTop: 50
  }
});

//map TeamPageState to Props
//Allow  to be called with provided actionCreators
//connect State Props and Actions
function mapStateToProps(state) {
    return {
        calendarState: state.get('calendarState')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutCalendar);
