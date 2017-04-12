/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var weight = t.refinement(t.Number, function (n) { return n > 0; });

weight.getValidationErrorMessage = function (value, path, context) {
  return 'capacity cannot be less than zero: ' + context.locale;
};
var Workout = t.struct({
  name: t.String,
  split1: t.String,
  split2: t.String,
  split3: t.String,
  weight: weight,
  timeStart: t.Date
})

var options = {
  auto: 'placeholders',
  fields: {
    timeStart: {
      mode: 'time'
    }
  }
};


export default class TeamManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: "",
        split1: "",
        split2: "",
        split3: "",
        weight: 150
      }
    }
  }
  onChange(value) {
    this.setState({value});
  }

  onPress() {
    console.log("Pressed")
    var value = this.refs.form.getValue();
    this.setState({value: {weight: 150}});
    if(value) {
      var copy = Object.assign({}, value);

      fetch("http://localhost:8080/postworkout", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            workoutData: copy
          })
        })
      }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style = {{fontSize: 25, fontWeight: '700', color: '#323232', marginTop: 20}}>Post a Workout </Text>
        <Form
          ref="form"
          type={Workout}
          options = {options}
          onChange = {this.onChange.bind(this)}
          value = {this.state.value}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
}
});

AppRegistry.registerComponent('TeamManager', () => TeamManager);
