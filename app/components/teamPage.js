import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Container} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

class TeamPage extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{backgroundColor:'rgba(0,0,0,0)', color: 'pink', fontSize:25, fontWeight:'700'}}>TEAM PAGE BITCH</Text>
      </View>
    )
  }
}

export default TeamPage;
