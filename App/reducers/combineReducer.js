
import tabs from './tabReducer';
// import {populatedActivities} from './initialReducer';
// import {loginReducer, profileReducer} from './loginReducer';
import { combineReducers } from 'redux-immutable';
import calendarState from './calendarReducers';
// import { messageReducer } from './messageReducer';


const applicationReducers = {
	tabs,
	calendarState: calendarState
};

export default function createReducer() {
	return combineReducers(applicationReducers);
}
