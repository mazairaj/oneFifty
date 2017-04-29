import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Main from '../components/mainPage';

const styles = StyleSheet.create({
  wrapper: {
      flex: 1,
  }
})

import {TabBar} from '../components/navigation';
//call Tabbar
class TeamManager extends Component {
  render() {
    return(
      <View style={styles.wrapper}>
        <TabBar/>
      </View>
    )
  }
}

export default TeamManager;
