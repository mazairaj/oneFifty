
import tabs from './tabReducer';
// import {populatedActivities} from './initialReducer';
// import {loginReducer, profileReducer} from './loginReducer';
import { combineReducers } from 'redux-immutable';
import calendarState from './calendarReducers';
import teamData from './teamDataReducer';
import teamPageState from './teamPageReducer'
// import { messageReducer } from './messageReducer';


const applicationReducers = {
	tabs,
	calendarState: calendarState,
	teamData: teamData,
	teamPageState: teamPageState
};

export default function createReducer() {
	return combineReducers(applicationReducers);
}
