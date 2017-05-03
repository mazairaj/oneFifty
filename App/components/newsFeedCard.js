import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Right, Left, Thumbnail, List, ListItem, Body, Header, Badge, Button} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

//Each indicdual post on news feed comes in the form of NewsFeedCard
class NewsFeedCard extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const {cardProps} = this.props;
    return(
        <Card style={{flex:0}}>
          <Content
            horizontal = {false}>
              <View style = {{borderBottomColor: 'gray', borderBottomWidth:1}}>
                <CardItem header>
                <Thumbnail style={{marginTop: 5, marginRight: 10, height: 36, width: 36, borderRadius: 18}} source={require('../../assets/image/Simulator.png')} />
                  <Body>
                    <View style={{justifyContent: 'center', marginTop:5}}>
                    <Text>{cardProps.name}</Text>
                    <Text>{cardProps.date}</Text>
                    </View>
                  </Body>
                  <Right style={{marginTop:5}}>
                    <Image source={require('../../assets/image/chat.png')} />
                  </Right>
                </CardItem>
              </View>
            <View style = {{borderBottomColor: 'gray', borderBottomWidth:1}}>
              <CardItem cardBody>
                <Body>
                  {cardProps.cardImg ? <Image source={{uri: cardProps.cardImg}} style={{width: 400, height: 400}}/> : null }
                  <View style={{padding: 10}}>
                    <Text>{cardProps.bodyText}</Text>
                  </View>
                </Body>
              </CardItem>
            </View>
            <CardItem footer>
              <Text>Footer</Text>
            </CardItem>
          </Content>
        </Card>
  )
  }
}

export default NewsFeedCard
