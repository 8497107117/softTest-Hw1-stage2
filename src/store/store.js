import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import reducers from '../reducers';

const initialState = Immutable.Map();

export default createStore(
	reducers,
	initialState,
	applyMiddleware(reduxThunk, createLogger({ stateTransformer: state => state.toJS() }))
);