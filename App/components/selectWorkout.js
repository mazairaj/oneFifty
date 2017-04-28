
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/calendarActions';

const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

export class SelectWorkout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['OPTIONLIST']);
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }
  selectWorkout(workout) {
    console.log(workout)
    this.props.navigation.navigate("WorkoutForm", workout);
  }


  render() {
    const { navigate } = this.props.navigation;
    const { teamData } = this.props;
    console.log(this.props)
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Select
          width={250}
          ref="SELECT1"
          optionListRef={this._getOptionList.bind(this)}
          onSelect={this.selectWorkout.bind(this)}>
          <Option value ={{workoutName: "New Workout", workoutMetrics: []}}>+ Custom Workout</Option>
          {teamData.favoriteWorkouts.map((workout) => {
            return <Option value={workout}>{workout.workoutName}</Option>
          })}
        </Select>

        <OptionList ref="OPTIONLIST"/>
    </View>
    )
  }
}

function mapStateToProps(state) {
    return {
        teamData: state.get('teamData'),
    };
}

export default connect(mapStateToProps)(SelectWorkout);
