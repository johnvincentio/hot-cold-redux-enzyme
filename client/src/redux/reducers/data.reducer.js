//

/* eslint-disable import/prefer-default-export */

import { NEW_GAME, TOGGLE_HELP, TOGGLE_ANSWER, HANDLE_GUESS } from '../actions';

import Utils from '../../utils';

const initialState = {
	guesses: [],
	answer: Utils.randomInteger(1, 100),
	showHelp: false,
	text: 'Make your Guess!',
	victory: false,
	showAnswer: false
};

function data(state = initialState, action) {
	console.log('dataReducer; state ', state, ' action ', action);
	if (action.type === NEW_GAME) {
		return Object.assign({}, initialState, {
			answer: Utils.randomInteger(1, 100)
		});
	} else if (action.type === TOGGLE_HELP) {
		return Object.assign({}, state, {
			showHelp: !state.showHelp
		});
	} else if (action.type === TOGGLE_ANSWER) {
		return Object.assign({}, state, {
			showAnswer: !state.showAnswer
		});
	} else if (action.type === HANDLE_GUESS) {
		const value = action.guess;
		if (state.guesses.findIndex(item => item === value) === -1) {
			const text = Utils.handleComment(value, state.answer);
			const arr = JSON.parse(JSON.stringify(state.guesses));
			const victory = Math.abs(value - state.answer) === 0;
			arr.push(value);
			return Object.assign({}, state, {
				guesses: arr,
				text,
				victory
			});
		}
		return state;
	}
	return state;
}

export default data;
