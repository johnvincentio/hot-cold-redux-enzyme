//

/* global describe, it, expect */

import { hotColdReducer } from '../../../src/reducers';
import { newGame } from '../actions';

describe('hotColdReducer', () => {
	it('Should set the initial state when nothing is passed in', () => {
		const state = hotColdReducer(undefined, { type: '__UNKNOWN' });
		expect(state.guesses).toEqual([]);
		expect(state.showHelp).toEqual(false);
		expect(state.text).toEqual('Make your Guess!');
		expect(state.victory).toEqual(false);
		expect(state.showAnswer).toEqual(false);
	});

	it('Should return the current state on an unknown action', () => {
		const currentState = {};
		const state = hotColdReducer(currentState, { type: '__UNKNOWN' });
		expect(state).toBe(currentState);
	});
});
