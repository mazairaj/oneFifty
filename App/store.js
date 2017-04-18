import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
// import createReducer from './reducers/combineReducer';
import createReducer  from './reducers/combineReducer';
import devTools from 'remote-redux-devtools';
// = fromJS({ })
function configureStore(initialState) {
	const createStoreWithMiddleware = compose(applyMiddleware(thunk), devTools())(createStore);
	return createStoreWithMiddleware(createReducer(), initialState);
}

module.exports = configureStore;
