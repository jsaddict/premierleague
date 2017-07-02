import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

export default function setAppStore(initState){
	return createStore(reducer, initState, applyMiddleware(thunk));
}