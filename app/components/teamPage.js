import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Text, Image, TouchableOpacity, ListView, ScrollView} from 'react-native';
import { Container, Content, Card, CardItem, Right, Left, Thumbnail, List, ListItem, Body, Header, Badge, Button} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/calendarActions';
// import SocketIOClient from 'socket.io-client';

import NewsFeedCard from './newsFeedCard'
import CreatePost from './createPost'

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

class TeamPage extends Component {
  constructor(props){
    super(props)
    // 
    // this.socket = SocketIOClient('http://localhost:8080')
  }
  render(){
    const {teamPageState} = this.props;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(teamPageState.newsFeedCards);
    console.log(this.props)
    return (
      <Container style ={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ListView
       dataSource = {dataSource}
       renderHeader = {() => <CreatePost/>}
       renderRow={(val, i) =>
        <Content style={{ paddingLeft: 10, paddingRight: 10,width: width}}>
          <NewsFeedCard cardProps = {val}/>
        </Content>
      }/></Container>
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
    marginTop: 50
  }
});

function mapStateToProps(state) {
    return {
        teamPageState: state.get('teamPageState'),
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);
