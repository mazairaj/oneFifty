import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Text, Image, TouchableOpacity, ListView} from 'react-native';
import { Container, Content, Card, CardItem, Right, Left, Thumbnail, List, ListItem, Body, Header, Badge, Button} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var _ = require('underscore')
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

class WorkoutData extends Component {
  constructor(props){
    super(props)
  }

  render(){

    const {params} = this.props.navigation.state
    console.log("HEOTEOTEOH", params)
    var date = new Date(params.date)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(params.workoutMetrics);
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex:1, backgroundColor: "#779ECB"}}>
          <View style= {{flexDirection: 'row'}}>
            <View style ={{flex: 3}}>
              <Thumbnail style={{marginTop: 15, marginLeft: 10, marginBottom: 10,height: 80, width: 80, borderRadius: 40, justifyContent: 'flex-start'}} source={{uri: params.img}} />
              <Text style = {{fontSize: 15, textAlign: 'center'}}>{params.athleteName}</Text>
            </View>
            <View style={{margin: 15, flex: 7}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{}}>
                  <Text style={{textAlign:'center'}}>Meters</Text>
                  <Text style={{textAlign:'center'}}>42.3K</Text>
                </View>
                <View style={{}}>
                  <Text style={{textAlign:'center'}}>Time</Text>
                  <Text style={{textAlign:'center'}}>43:46:30</Text>
                </View>
                <View style={{}}>
                  <Text style={{textAlign:'center'}}>Average</Text>
                  <Text style={{textAlign:'center'}}>1:51.2</Text>
                </View>
              </View>
              <Button style={{
                height: 36,
                margin: 10,
                backgroundColor: '#48BBEC',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 10,
                alignSelf: 'stretch',
                justifyContent: 'center'
              }}><Text>History</Text></Button>
            </View>
          </View>
        </View>
        <View style={{flex:3, backgroundColor: "transparent"}}>
          <Text style={{textAlign:'center', marginTop: 10, fontSize:30, textDecorationLine: 'underline'}}>{params.date}</Text>
          <ListView
           dataSource = {dataSource}
           renderHeader = {() => <Text style={{marginTop: 15, marginLeft: 20, fontSize: 25}}>{params.workoutName}:</Text>}
           renderRow={(val, i) =>
            <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row', height: 35, borderBottomColor: 'gray', borderBottomWidth: 2}}>
              <View style={{justifyContent: 'flex-end'}}>
              <Text style = {{fontSize: 20, textAlign: 'center'}}>{val.name}:</Text>
              </View>
              <Right>
              <View style={{justifyContent: 'flex-end'}}>
              <Text style = {{fontSize: 20, textAlign: 'center'}}>{val.value}</Text>
              </View>
              </Right>
            </View>
          }
          renderFooter={() =>
            <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row', height: 35}}>
            <Right>
            <View style={{justifyContent: 'flex-end'}}>
            <Text style = {{fontSize: 20, textAlign: 'center'}}>{params.weight} lbs</Text>
            </View>
            </Right>
            </View>
          }/>
        </View>
        <Button style={{
          height: 36,
          margin: 10,
          backgroundColor: '#48BBEC',
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 8,
          marginBottom: 10,
          alignSelf: 'stretch',
          justifyContent: 'center'
        }}><Text>Compare Result</Text></Button>
      </View>
    )
  }
}

  export default WorkoutData;
