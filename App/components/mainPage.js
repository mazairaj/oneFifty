import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Container} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as actionCreators from '../actions/loginAction';
import WorkoutCalendar from './workoutCalendar';
import WorkoutForm from './workoutForm';

import {
  StackNavigator,
} from 'react-navigation';

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
      flex: 1,
      backgroundColor: 'white'
  },
  text: {
      fontSize: 20,
      color: '#01579B',
      justifyContent: 'center',
      alignItems:'center'
  },
  selectOption: {
    flex: 1,
    width: width,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  }
})

class Main extends Component {
  static navigationOptions = {
    title: 'Team Portal',
  };
  constructor(props){
    super(props)
  }
  render() {
    console.log("Props", this.props)
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.wrapper}>
        <View style = {{
          flex: 1,
          width: width,
          marginBottom: 5,
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => navigate('TeamPage')}>
            <Image source={require('../../assets/image/rugby.jpg')} resizeMode="stretch" style={{width:width, height:145, justifyContent:'flex-end', alignItems:'flex-start'}}>
              <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'center', color:'#fff', fontSize:25, fontWeight:'700', marginLeft: 10}}>Your Teams</Text>
            </Image>
          </TouchableOpacity>
        </View>
        <View style = {styles.selectOption}>
          <TouchableOpacity onPress={() => navigate('PostWorkout', {hello:4})}>
            <Image source={require('../../assets/image/trainingLog.jpg')} resizeMode="stretch" style={{width:width, height:145, justifyContent:'flex-end', alignItems:'flex-start'}}>
              <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'center', color:'#fff', fontSize:25, fontWeight:'700', marginLeft: 10}}>Post Workout</Text>
            </Image>
          </TouchableOpacity>
        </View>
        <View style = {styles.selectOption}>
          <TouchableOpacity onPress={() => navigate('TeamPage')}>
            <Image source={require('../../assets/image/weights.jpeg')} resizeMode="stretch" style={{width:width, height:145, justifyContent:'flex-end', alignItems:'flex-start'}}>
              <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'center', color:'#fff', fontSize:25, fontWeight:'700', marginLeft: 10}}>Create Workout</Text>
            </Image>
          </TouchableOpacity>
        </View>
        <View style = {{
          flex: 1,
          width: width,
          marginTop: 5,
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => navigate('TeamPage')}>
            <Image source={require('../../assets/image/calendarPhoto.jpg')} resizeMode="stretch" style={{width:width, height:145, justifyContent:'flex-end', alignItems:'flex-start'}}>
              <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'center', color:'#fff', fontSize:25, fontWeight:'700', marginLeft: 10}}>Your Calendar</Text>
            </Image>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
export default Main
