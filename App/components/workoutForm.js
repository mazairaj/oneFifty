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
  TouchableHighlight, ScrollView
} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;

import AutoSuggest from 'react-native-autocomplete-input'
var weight = t.refinement(t.Number, function (n) { return n > 0; });
//weight must be a number
weight.getValidationErrorMessage = function (value, path, context) {
  return 'capacity cannot be less than zero: ' + context.locale;
};

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
    const {params} = this.props.navigation.state
    var keys = [...params.workoutMetrics]
    //define the value metrics fot the selected workout form
    var valueMetrics ={};
    keys.forEach(function(metric){
      var name = metric.name;
      valueMetrics[name] = ""
    })
    valueMetrics["weight"] = 150;
    //define metrics in tcomb format
    var metrics = [...params.workoutMetrics]
    var metricsObj = {};
    metrics.forEach(function(metric){
      var name = metric.name;
      metricsObj[name] = t.String
    })
    //state metrics change for each selected workout
    this.state = {
      str: "",
      query: "",
      value: valueMetrics,
      metrics: metricsObj
    }
  }
  onChange(value) {
    this.setState({value});
  }
  onAddMetric() {

  }

  onPress() {
    const {params} = this.props.navigation.state

    var value = this.refs.form.getValue();
    var name = this.state.query;
    var date = new Date(value.date);
    date = date.toDateString()
    console.log(date)
    var metricNames = Object.keys(value)
    metricNames = metricNames.slice(2, (metricNames.length))
    var metricObjects = metricNames.map((metric) => {
      return {name: metric, value: value[metric]}
    })

    this.setState({query: "", value: {weight: 150}});
    if(value) {
      var copy = Object.assign({}, value);
      copy["name"] = name;
      console.log("COPY", copy)

      fetch("http://localhost:8080/postWorkoutSpreadsheet", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            workoutData: copy
          })
        })
        .catch((err) => {
          console.log('error in post to spreadsheet -> ', err)
        });
      // fetch("http://localhost:8080/postWorkoutMongo",{
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     name: name,
      //     workoutName: params.workoutName,
      //     date: date,
      //     weight: copy.weight,
      //     metricObjects: metricObjects
      //
      //   })
      // })
    }
  }
  _filterData(value){
    console.log(value);
    if (value === "") {
      return [];
    }
    var len = value.length;
    var final = false;
    var store = ['Mazaira', 'James', 'Julian', 'CF150']
    var filtered = store.filter((str) => {
      if (str === value) {
        final = true;
      }
      return value.toLowerCase() === str.substring(0, len).toLowerCase();
    })
    if (final) {
      return [];
    }
    return filtered;
  }
  render() {
    console.log("calendarForm",this.state.value)
    const {query} = this.state;
    const data = this._filterData(query)

    var Workout = t.struct(Object.assign({
      date: t.Date,
      weight: weight
    }, this.state.metrics))

    return (
      <View style={styles.container}>
        <Text style = {{fontSize: 25, fontWeight: '700', color: '#323232', marginTop: 20}}>Post a Workout </Text>
        <ScrollView>
        <AutoSuggest style={{width: 350, height: 35, borderRadius: 5}}
          containerStyle = {{padding: 10, borderRadius: 5}}
          data={data}
          defaultValue = {query}
          onChangeText = {text => this.setState({query: text})}
          renderItem={data => (
            <TouchableHighlight onPress={() => this.setState({query: data})}>
              <Text>{data}</Text>
            </TouchableHighlight>
          )}
        />
        <Form
          ref="form"
          type={Workout}
          options = {options}
          onChange = {this.onChange.bind(this)}
          value = {this.state.value}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Add Metric</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        </ScrollView>
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
