//

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import HotCold from './components/HotCold';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<HotCold />
	</Provider>,
	document.getElementById('root')
);
