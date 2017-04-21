import { View, Text, StyleSheet, TabBarIOS, TouchableOpacity, Image, ScrollView, ListView} from 'react-native';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Right, Left, Thumbnail, List, ListItem, Body, Header, Badge, Button} from 'native-base';
import Swiper from 'react-native-swiper'
import { Icon } from 'react-native-elements'
import Calendar from 'react-native-calendar'

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
  onDateSelect(date) {
    console.log("On Date Select")
    const {actions} = this.props
    var dateSelect = new Date(date)
    var nextDate = new Date(date);
    var prevDate = new Date(date);
    nextDate.setDate(dateSelect.getDate()+1);
    prevDate.setDate(dateSelect.getDate()-1);
    actions.selectDay(dateSelect.toDateString(), nextDate.toDateString(), prevDate.toDateString());
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
  _onMomentumScrollEnd(evt, state, context){
    const {calendarState} = this.props;
    console.log("INDEX", context.state.index)
    // if (context.state.index === 2) {
    //   var nextDate = new Date(date);
    //   nextDate.setDate(calendarState.date.getDate()+1);
    //   this.onDateSelect(nextDate)
    // } else if (context.state.index === 0){
    //   var prevDate = new Date(date);
    //   prevDate.setDate(calendarState.date.getDate()-1);
    //   this.onDateSelect(prevDate)
    // }

}
  render(){
    const {actions, calendarState} = this.props
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const dataSource = ds.cloneWithRows(calendarState.populatedWorkouts.dateSelect)
    const dataSourcePrev = ds.cloneWithRows(calendarState.populatedWorkouts.prevDateObj)
    const dataSourceNext = ds.cloneWithRows(calendarState.populatedWorkouts.nextDateObj)
    console.log("Datag", calendarState.populatedWorkouts.prevDateObj)
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
            onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
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
          <View
            style= {styles.overlay}>
            <Swiper
            horizontal={true}
              loop={false}
              showsPagination={false}
              index={0}>
              <Swiper
                horizontal={true}
                loop={false}
                showsPagination={false}
                index={0}
                onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
                >
                <Swiper
                  horizontal = {true}
                  loop = {false}
                  showsPagination = {false}
                  index = {1}
                  >
                  <View
                    style= {styles.overlay}>
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
                    </List>
                    </View>
                </CardItem>
              </Content>
              </Card>
              </View>
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
                  </List>
                    </View>
                </CardItem>
                </Content>
              </Card>
              </View>
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
                    </List>
                  </View>
                </CardItem>
              </Content>
              </Card>
              </View>
              </Swiper>
              </Swiper>
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
