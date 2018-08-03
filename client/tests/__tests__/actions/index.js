//

/* global describe, it, expect */

import {
	NEW_GAME,
	newGame,
	TOGGLE_HELP,
	toggleHelp,
	TOGGLE_ANSWER,
	toggleAnswer,
	HANDLE_GUESS,
	handleGuess
} from '../../../src/actions';

describe('newGame', () => {
	it('Should return the action', () => {
		const action = newGame();
		expect(action.type).toEqual(NEW_GAME);
	});
});

describe('toggleHelp', () => {
	it('Should return the action', () => {
		const action = toggleHelp();
		expect(action.type).toEqual(TOGGLE_HELP);
	});
});

describe('TOGGLE_ANSWER', () => {
	it('Should return the action', () => {
		const action = toggleAnswer();
		expect(action.type).toEqual(TOGGLE_ANSWER);
	});
});

describe('HANDLE_GUESS', () => {
	it('Should return the action', () => {
		const action = handleGuess(45);
		expect(action.type).toEqual(HANDLE_GUESS);
		expect(action.guess).toEqual(45);
	});
});
