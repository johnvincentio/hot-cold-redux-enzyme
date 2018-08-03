//

import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';

const configureStore = (initialState = {}) => {
	const middleware = [thunk];
	const enhancers = compose(applyMiddleware(...middleware));
	const store = createStore(rootReducer, initialState, enhancers);
	return store;
};

export default configureStore;
