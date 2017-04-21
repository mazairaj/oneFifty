import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Main from '../components/mainPage';

const styles = StyleSheet.create({
  wrapper: {
      flex: 1,
  }
})

import Navigation from '../components/navigation';

class TeamManager extends Component {
  render() {
    return(
      <View style={styles.wrapper}>
        <Navigation/>
      </View>
    )
  }
}

export default TeamManager;
