import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Right, Left, Thumbnail, List, ListItem, Body, Header, Badge, Button} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//TODO Design WorkoutData Layout
class WorkoutData extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const {params} = this.props.navigation.state
    console.log("HEOTEOTEOH", params)
    return (
      <View>
        <Text>{params.athleteName}</Text>
        <Text>{params.workoutName}</Text>
      </View>
    )
  }
}

  export default WorkoutData;
