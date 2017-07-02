import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import setAppStore from './store';
import Accordion from './components/Accordion';
import './styles/styles.css';

const initState = {
	accordion : {
		stateList : [],
		// dataStatus : 'init/fetching/error/success'
		dataStatus : 'init',
		data : []
	}
};

ReactDOM.render(
	<Provider store = {setAppStore(initState)}>
		<Accordion />
	</Provider>, 
	document.getElementById('premiere-league-info')
);