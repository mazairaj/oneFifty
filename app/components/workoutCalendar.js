import { View, Text, StyleSheet, TabBarIOS, TouchableOpacity, Image, ScrollView, ListView} from 'react-native';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Right, Left, Thumbnail, List, ListItem, Body, Header, Badge, Button} from 'native-base';
import { Icon } from 'react-native-elements'
import Calendar from 'react-native-calendar'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Swiper from 'react-native-swiper';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/calendarActions';


var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

const dates = [null];
const date = new Date();

class WorkoutCalendar extends Component {
  constructor(props) {
    super(props);
  }
  onDateSelect(date, bool) {
    const {actions} = this.props
    var dateSelect = new Date(date)
    var nextDate = new Date(date);
    var prevDate = new Date(date);
    nextDate.setDate(dateSelect.getDate()+1);
    prevDate.setDate(dateSelect.getDate()-1);
    console.log(dateSelect.toDateString(), nextDate.toDateString(), prevDate.toDateString())
    actions.selectDay(dateSelect.toDateString(), nextDate.toDateString(), prevDate.toDateString(), bool);
  }
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
  onSwipeRight(gestureState) {
    console.log("Right", gestureState);
    const {calendarState, actions} = this.props
    var newDate = new Date(calendarState.date)
    newDate.setDate(calendarState.date.getDate()-1)
    console.log(newDate)
    this.onDateSelect(newDate, false)
    actions.cycleOrder(calendarState.currOrder, false)

  }
  onSwipeLeft(gestureState) {
    console.log("Left", gestureState);
    const {calendarState, actions} = this.props
    var newDate = new Date(calendarState.date)
    newDate.setDate(calendarState.date.getDate()+1)
    console.log(newDate)
    this.onDateSelect(newDate, false))
    actions.cycleOrder(calendarState.currOrder, true)
  }
  onSwipe(gestureName, gestureState) {
  const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  this.setState({gestureName: gestureName});
  switch (gestureName) {
    case SWIPE_LEFT:
      break;
    case SWIPE_RIGHT:
      break;
  }
}
  _onMomentumScrollEnd(date) {

  }
  render(){
    const {actions, calendarState} = this.props
    const config = {
      velocityThreshold: 0.15,
      directionalOffsetThreshold: 20
    };

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const dataSource = ds.cloneWithRows(calendarState.currOrder[1])
    const dataSourcePrev = ds.cloneWithRows(calendarState.currOrder[0])
    const dataSourceNext = ds.cloneWithRows(calendarState.currOrder[2])
    return(
      <View style={{flex: 1}}>
      <View style = {{flex:1}}>
        <TouchableOpacity onPress={() =>{
          if (calendarState.dateClicked) {
            actions.toggleDateClickFalse();
          }
        }}>
          <Calendar
            currentMonth={'2017-04-01'}       // Optional date to set the currently displayed month after initialization
            customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
            eventDates={['2017-04-01']}       // Optional array of moment() parseable dates that will show an event indicator
            events={[{date:'2017-04-01'}]}// Optional array of event objects with a date property and custom styles for the event indicator
            nextButtonText={'Next'}           // Text for next button. Default: 'Next'
            onDateSelect={(date) => this.onDateSelect(date, true)} // Callback after date selection
            onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
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
            <View style={styles.overlay}>
              <Swiper
                 horizontal = {true}
                 loop = {true}
                 showsPagination = {false}
                 index = {1}
                 onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
                 >
                 <GestureRecognizer
                  onSwipeLeft={(state) => this.onSwipeLeft(state)}
                  onSwipeRight={(state) => this.onSwipeRight(state)}
                  config={config}
                  >
                 <View style= {styles.overlay}>
              <Card>
              <Content
                horizontal = {false}>
                <CardItem header>
                <Left>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>{calendarState.date.getDate()-1}</Text>
                    <Text>{this.getDay(calendarState.date, -1)}</Text>
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
                        <Right>
                          <Badge style={{ backgroundColor: '#8C97B5' }}><Text>2</Text></Badge>
                        </Right>
                        <Right>
                          <Image source={require('../../assets/image/chat.png')} />
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
              </GestureRecognizer>
              <GestureRecognizer
               onSwipeLeft={(state) => this.onSwipeLeft(state)}
               onSwipeRight={(state) => this.onSwipeRight(state)}
               config={config}
               >
              <View
                style= {styles.overlay}>
              <Card>
              <Content
                horizontal = {false}>
                <CardItem header>
                <Left>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>{calendarState.date.getDate()}</Text>
                    <Text>{this.getDay(calendarState.date, 0)}</Text>
                  </View>
                </Left>
                </CardItem>
                <CardItem cardBody>
                  <View style={{width: width}}>
                  <List>
                  <ScrollView>
                  <ListView
                   dataSource = {dataSource}
                   renderRow={(val) =>
                     <ListItem>
                      <Thumbnail style={{marginTop: 5, marginRight: 10, height: 36, width: 36, borderRadius: 18}} source={require('../../assets/image/Simulator.png')} />
                      <Body>
                        <Text>{val.workoutName}</Text>
                        <Text>{val.athleteName}</Text>
                      </Body>
                      <Right>
                        <Badge style={{ backgroundColor: '#8C97B5' }}><Text>2</Text></Badge>
                      </Right>
                      <Right>
                        <Image source={require('../../assets/image/chat.png')} />
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
              </GestureRecognizer>
              <GestureRecognizer
               onSwipeLeft={(state) => this.onSwipeLeft(state)}
               onSwipeRight={(state) => this.onSwipeRight(state)}
               config={config}
               >
              <View
                style= {styles.overlay}>
              <Card>
              <Content
                horizontal = {false}>
                <CardItem header>
                <Left>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>{calendarState.date.getDate()+1}</Text>
                    <Text>{this.getDay(calendarState.date, 1)}</Text>
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
                       <ListItem>
                        <Thumbnail style={{marginTop: 5, marginRight: 10, height: 36, width: 36, borderRadius: 18}} source={require('../../assets/image/Simulator.png')} />
                        <Body>
                          <Text>{val.workoutName}</Text>
                          <Text>{val.athleteName}</Text>
                        </Body>
                        <Right>
                          <Badge style={{ backgroundColor: '#8C97B5' }}><Text>2</Text></Badge>
                        </Right>
                        <Right>
                          <Image source={require('../../assets/image/chat.png')} />
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
              </GestureRecognizer>
              </Swiper>
            </View>) : null}
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
