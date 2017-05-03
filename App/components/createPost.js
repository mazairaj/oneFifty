import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import { Content, Card, CardItem, Right, Thumbnail,Item, Badge, Button, Input} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/teamPageActions';

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

//Create Post is the component used to create a new post. This appears before the other posts in the DB
class CreatePost extends Component{
  constructor(props){
    super(props)

    this.state = {
      text: ""
    }
  }
  post(){
    console.log("PROPSBITCH", this.props)
    var date = new Date()
    var post = {
      name: "Julian Mazaira",
      date: date.toDateString(),
      profileImg: "",
      postType: "",
      cardImage: "",
      bodyText: this.state.text
    }
    this.setState({text: ""})
    fetch("https://morning-taiga-46107.herokuapp.com/newPost",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        post: post
      })
    }).then(this.props.actions.postedData(post))
    //
    this.props.socket.emit('post', post)

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
                      <Input placeholder='Bye Felicia!' ref= {(el) => { this.text = el }}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}/>
                    </Item>
                  </Content>
                </View>
              </CardItem>
            </View>
            <CardItem>
              <Right>
                <Button style={{height: 30}} onPress={this.post.bind(this)}><Text>Post</Text></Button>
              </Right>
            </CardItem>
          </Content>
        </Card>
      </Content>
    )
  }
}
function mapStateToProps(state) {
    return {
        teamPageState: state.get('teamPageState'),
    };
}
//Allow dispatch to be called with provided actionCreators
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
    };
}
//connect State Props and Actions
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
