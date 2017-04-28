import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Right, Left, Thumbnail, List, ListItem, Body, Header,Input,Item, Badge, Button} from 'native-base';

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

class CreatePost extends Component{
  constructor(props){
    super(props)
  }
  post(){
    
  }
  render(){
    return (
      <Content style={{ paddingLeft: 10, paddingRight: 10,width: width}}>
      <Card>
      <Content
        horizontal = {false}>
        <View style = {{borderBottomColor: 'gray', borderBottomWidth:1}}>
        <CardItem>
        <View style={{flexDirection: 'row'}}>
          <Button transparent style={{flex:1, padding: 5, justifyContent: 'center', borderRightColor: 'gray', borderRightWidth: 1, borderRadius: 0}}><Text>Photo</Text></Button>
          <Button transparent style={{flex:1, padding: 5, justifyContent: 'center', borderRightColor: 'gray', borderRightWidth: 1, borderRadius: 0}}><Text>Workout</Text></Button>
          <Button transparent style={{flex:1, padding: 5, justifyContent: 'center'}}><Text>More</Text></Button>
        </View>
        </CardItem>
        </View>
        <View style = {{borderBottomColor: 'gray', borderBottomWidth:1}}>
        <CardItem cardBody>
          <View style={{padding: 10, flexDirection:'row'}}>
          <Thumbnail square size={80} source={require('../../assets/image/Simulator.png')} />
          <Content>
            <Item style={{marginLeft: 10, borderColor: 'gray', borderWidth: 1}} >
              <Input placeholder='Bye Felicia!'/>
            </Item>
          </Content>
          </View>
        </CardItem>
        </View>
        <CardItem>
          <Right>
            <Button style={{height: 30}}><Text>Post</Text></Button>
          </Right>
        </CardItem>
      </Content>
      </Card>
      </Content>
    )
  }
}
export default CreatePost;
