
import tabs from './tabReducer';
// import {populatedActivities} from './initialReducer';
// import {loginReducer, profileReducer} from './loginReducer';
import { combineReducers } from 'redux-immutable';
// import { messageReducer } from './messageReducer';


const applicationReducers = {
	tabs
};

export default function createReducer() {
	return combineReducers(applicationReducers);
}
