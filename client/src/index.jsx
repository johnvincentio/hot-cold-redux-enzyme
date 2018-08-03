//

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './store';

import HotCold from './components/HotCold';

ReactDOM.render(
	<Provider store={store}>
		<HotCold />
	</Provider>,
	document.getElementById('root')
);
