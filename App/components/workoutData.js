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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex:2, backgroundColor: "#779ECB"}}>
          <Thumbnail style={{marginTop: 15, marginLeft: 10, height: 80, width: 80, borderRadius: 40, alignItems: 'flex-start'}} source={require('../../assets/image/Simulator.png')} />
        </View>
        <View style={{flex:3, backgroundColor: "transparent"}}>
        </View>
      </View>
    )
  }
}

  export default WorkoutData;
