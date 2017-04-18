
import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as actionCreators from '../actions/loginAction';
import Tabs from '../components/tabs';

const styles = StyleSheet.create({
  wrapper: {
      marginTop: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  text: {
      fontSize: 20,
      color: '#01579B'
  }
})

class TeamManager extends Component {
  render() {
    console.log("Props", this.props)
    return(
      <View style={styles.wrapper}>
        <Text style = {styles.text}> Message Board </Text>
        <Tabs/>
      </View>
    )
  }
}

export default TeamManager;
