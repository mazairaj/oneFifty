
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
  },
  text: {
      fontSize: 20,
      color: '#01579B',
      justifyContent: 'center',
      alignItems:'center'
  }
})

class TeamManager extends Component {
  render() {
    console.log("Props", this.props)
    return(
      <View style={styles.wrapper}>
        <Tabs />
      </View>
    )
  }
}

export default TeamManager;
