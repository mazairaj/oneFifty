import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Text, Image, TouchableOpacity, ListView} from 'react-native';
import { Container, Content, Card, CardItem, Right, Left, Thumbnail, List, ListItem, Body, Header, Badge, Button} from 'native-base';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var _ = require('underscore')
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

class WorkoutRanking extends Component {
  constructor(props){
    super(props)
    const {params} = props.navigation.state
    var metrics = params.workouts[0].workoutMetrics
    metrics = metrics.map((metric) => metric.name)


    console.log("HEY",metricsObj)
    this.state = {
      selected: metrics[0]
    }
  }

  render(){
    const {params} = this.props.navigation.state
    var metrics = params.workouts[0].workoutMetrics
    metrics = metrics.map((metric) => metric.name)

    console.log("HEOTEOTEOH", params)
    var date = new Date(params.date)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(params.workouts);
    const createTabBar = metrics.map((metric) => {
      if (metric === this.state.selected) {
        var width = 5
      } else {
        var width: 1
      }
      return (
      <Button transparent key={metric} style={{flex:1, padding: 5, justifyContent: 'center', borderRightColor: 'gray', borderBottomColor: 'gray', borderRadius:0, borderBottomWidth: width, borderRightWidth: 1}}><Text style={{fontSize: 12}}
        onPress={()=> this.setState({selected: metric})}>{metric}</Text></Button>)
    })
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex:1, backgroundColor: "#779ECB"}}>
          <View style= {{flexDirection: 'row'}}>
            <View style ={{flex: 3}}>
              <Thumbnail style={{marginTop: 15, marginLeft: 10, marginBottom: 10,height: 80, width: 80, borderRadius: 40, justifyContent: 'flex-start'}} source={require('../../assets/image/Simulator.png')} />
              <Text style = {{fontSize: 15, textAlign: 'center'}}>P150</Text>
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
        <View style={{flex:3, backgroundColor: 'transparent'}}>
          <Text style={{textAlign:'center', marginTop: 10, fontSize:30, textDecorationLine: 'underline'}}>{params.date}</Text>
          <Text style={{marginTop: 15, marginLeft: 20, fontSize: 25}}>{params.workoutName}:</Text>
          <Card style={{flex:0}}>
              <View>
                <CardItem cardBody>
                  <Body>
                    <View style= {{padding: 5, flexDirection: 'row'}}>
                    <Button style={{backgroundColor: 'transparent', flex:1}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize:20}}>#</Text>
                    </View>
                    <View style={{flex: 9, flexDirection: 'row', alignItems: 'center'}}>
                    <Thumbnail style={{marginTop: 5, marginRight: 10, height: 36, width: 36, borderRadius: 18}} source={require('../../assets/image/Simulator.png')} />
                    <Text>This is data</Text>
                    <Right style={{justifyContent: 'center'}}>
                      <Icon  name='rowing' />
                    </Right>
                    </View>
                    </Button>
                    </View>
                  </Body>
                </CardItem>
              </View>
          </Card>
                   <View style={{width: width}}>
                     <List>
                     <ListView
                      dataSource = {dataSource}
                      renderRow={(val, sectionId, rowId) =>
                        <Card style={{flex:0}}>
                          <Content
                            horizontal = {false}>
                            <View style = {{borderBottomColor: 'gray', borderBottomWidth:1}}>
                              <CardItem cardBody>
                              <Body>
                                <View style= {{padding: 5, flexDirection: 'row'}}>
                                <Button style={{backgroundColor: 'transparent', flex:1}}>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={{fontSize:20}}>{parseInt(rowId) + 1}</Text>
                                </View>
                                <View style={{flex: 9, flexDirection: 'row', alignItems: 'center'}}>
                                <Thumbnail style={{marginTop: 5, marginRight: 10, height: 36, width: 36, borderRadius: 18}} source={require('../../assets/image/Simulator.png')} />
                                <Text>This is data</Text>
                                <Right style={{justifyContent: 'center'}}>
                                  <Icon  name='rowing' />
                                </Right>
                                </View>
                                </Button>
                                </View>
                              </Body>
                              </CardItem>
                            </View>
                          </Content>
                        </Card>
                     }/>
                     </List>
                   </View>
        </View>
      </View>
    )
  }
}

  export default WorkoutRanking;
