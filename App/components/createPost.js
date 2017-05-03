import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import { Content, Card, CardItem, Right, Thumbnail,Item, Badge, Button, Body, Input} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/teamPageActions';

var ImagePicker = require('react-native-image-picker');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

//Create Post is the component used to create a new post. This appears before the other posts in the DB
class CreatePost extends Component{
  constructor(props){
    super(props)

    this.state = {
      text: "",
      photoData: "",
      photo: null
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
        post: post,
        photo: this.state.photoData
      })
    }).then(this.props.actions.postedData(post))
    //
    // this.props.socket.emit('post', post)

  }
  photoSelect(){
    var date = Date.now();
    //Need to change to something more personalized in the future
    var imgTitle =  date + '.jpg';
    ImagePicker.showImagePicker({}, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          photo: source
        });
      }
      var formData = new FormData();
      formData.append('file', {
        uri: response.uri,
        type: 'image/jpeg',
        name:  imgTitle
      });
      this.setState({photoData: formData});
    });
  }
  render(){
    console.log('PhotoBITCH', this.state.photo)
    console.log(this.state.photoData)
    return (
      <Content style={{ paddingLeft: 10, paddingRight: 10,width: width}}>
        <Card>
          <Content
            horizontal = {false}>
              <View style = {{borderBottomColor: 'gray', borderBottomWidth:1}}>
                <CardItem>
                  <View style={{flexDirection: 'row'}}>
                    <Button transparent style={{flex:1, padding: 5, justifyContent: 'center', borderRightColor: 'gray', borderRightWidth: 1, borderRadius: 0}}
                      onPress={this.photoSelect.bind(this)}><Text>Photo</Text></Button>
                    <Button transparent style={{flex:1, padding: 5, justifyContent: 'center', borderRightColor: 'gray', borderRightWidth: 1, borderRadius: 0}}><Text>Workout</Text></Button>
                    <Button transparent style={{flex:1, padding: 5, justifyContent: 'center'}}><Text>More</Text></Button>
                  </View>
                </CardItem>
              </View>
            <View style = {{borderBottomColor: 'gray', borderBottomWidth:1}}>
              <CardItem cardBody>
              <Body>
              <View>
              {this.state.photo ? <Image source={this.state.photo} style={{width: 400, height: 400}}/> : null }
              </View>
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
              </Body>
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
