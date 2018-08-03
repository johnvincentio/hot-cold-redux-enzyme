//

/* global describe, it, expect */

import data from '../../../src/redux/reducers/data.reducer';

import { newGame, toggleHelp, toggleAnswer, handleGuess } from '../../../src/redux/actions';

import Utils from '../../../src/utils';

describe('data', () => {
	it('Should set the initial state when nothing is passed in', () => {
		const state = data(undefined, { type: '__UNKNOWN' });
		expect(state.guesses).toEqual([]);
		expect(state.showHelp).toEqual(false);
		expect(state.text).toEqual('Make your Guess!');
		expect(state.victory).toEqual(false);
		expect(state.showAnswer).toEqual(false);
	});

	it('Should return the current state on an unknown action', () => {
		const currentState = {};
		const state = data(currentState, { type: '__UNKNOWN' });
		expect(state).toBe(currentState);
	});

	describe('newGame', () => {
		it('Should start new game', () => {
			const currentState = {};
			const state = data(currentState, newGame());
			expect(state.guesses).toEqual([]);
			expect(state.showHelp).toEqual(false);
			expect(state.text).toEqual('Make your Guess!');
			expect(state.victory).toEqual(false);
			expect(state.showAnswer).toEqual(false);
		});
	});

	describe('toggleHelp', () => {
		it('Should toggle help', () => {
			const currentState = {
				answer: 37,
				showHelp: false
			};
			const state = data(currentState, toggleHelp());
			expect(state.guesses).toEqual(currentState.guesses);
			expect(state.answer).toEqual(currentState.answer);
			expect(state.showHelp).toEqual(!currentState.showHelp);
			expect(state.text).toEqual(currentState.text);
			expect(state.victory).toEqual(currentState.victory);
			expect(state.showAnswer).toEqual(currentState.showAnswer);
		});
	});

	describe('toggleAnswer', () => {
		it('Should toggle answer', () => {
			const currentState = {
				answer: 37,
				showAnswer: false
			};
			const state = data(currentState, toggleAnswer());
			expect(state.guesses).toEqual(currentState.guesses);
			expect(state.answer).toEqual(currentState.answer);
			expect(state.showHelp).toEqual(currentState.showHelp);
			expect(state.text).toEqual(currentState.text);
			expect(state.victory).toEqual(currentState.victory);
			expect(state.showAnswer).toEqual(!currentState.showAnswer);
		});
	});

	describe('handleGuess', () => {
		it('Should handle user guess', () => {
			const startState = data({}, newGame());
			expect(startState.guesses).toEqual([]);
			expect(startState.showHelp).toEqual(false);
			expect(startState.text).toEqual('Make your Guess!');
			expect(startState.victory).toEqual(false);
			expect(startState.showAnswer).toEqual(false);

			const guess = Math.abs(startState.answer - 1);
			const text = Utils.handleComment(guess, startState.answer);
			const state = data(startState, handleGuess(guess));

			expect(state.guesses.length).toEqual(1);
			expect(state.guesses[0]).toEqual(guess);
			expect(state.showHelp).toEqual(false);
			expect(state.text).toEqual(text);
			expect(state.victory).toEqual(false);
			expect(state.showAnswer).toEqual(false);
		});

		it('Should handle a second user guess', () => {
			const startState = data({}, newGame());

			const guess1 = Math.abs(startState.answer - 1);
			let text = Utils.handleComment(guess1, startState.answer);
			let state = data(startState, handleGuess(guess1));

			expect(state.guesses.length).toEqual(1);
			expect(state.guesses[0]).toEqual(guess1);
			expect(state.showHelp).toEqual(false);
			expect(state.text).toEqual(text);
			expect(state.victory).toEqual(false);
			expect(state.showAnswer).toEqual(false);

			const guess2 = Math.abs(startState.answer - 2);
			text = Utils.handleComment(guess2, startState.answer);
			state = data(state, handleGuess(guess2));

			expect(state.guesses.length).toEqual(2);
			expect(state.guesses[0]).toEqual(guess1);
			expect(state.guesses[1]).toEqual(guess2);
			expect(state.showHelp).toEqual(false);
			expect(state.text).toEqual(text);
			expect(state.victory).toEqual(false);
			expect(state.showAnswer).toEqual(false);
		});

		it('Should handle duplicate user guess', () => {
			const startState = data({}, newGame());

			const guess1 = Math.abs(startState.answer - 1);
			let text = Utils.handleComment(guess1, startState.answer);
			let state = data(startState, handleGuess(guess1));

			expect(state.guesses.length).toEqual(1);
			expect(state.guesses[0]).toEqual(guess1);
			expect(state.showHelp).toEqual(false);
			expect(state.text).toEqual(text);
			expect(state.victory).toEqual(false);
			expect(state.showAnswer).toEqual(false);

			const guess2 = guess1;
			text = Utils.handleComment(guess2, startState.answer);
			state = data(state, handleGuess(guess2));

			expect(state.guesses.length).toEqual(1);
			expect(state.guesses[0]).toEqual(guess1);
			expect(state.showHelp).toEqual(false);
			expect(state.text).toEqual(text);
			expect(state.victory).toEqual(false);
			expect(state.showAnswer).toEqual(false);
		});

		it('Should handle user guessed correctly', () => {
			const startState = data({}, newGame());
			expect(startState.guesses).toEqual([]);
			expect(startState.showHelp).toEqual(false);
			expect(startState.text).toEqual('Make your Guess!');
			expect(startState.victory).toEqual(false);
			expect(startState.showAnswer).toEqual(false);

			const guess = startState.answer;
			const text = Utils.handleComment(guess, startState.answer);
			const state = data(startState, handleGuess(guess));

			expect(state.guesses.length).toEqual(1);
			expect(state.guesses[0]).toEqual(guess);
			expect(state.showHelp).toEqual(false);
			expect(state.text).toEqual(text);
			expect(state.victory).toEqual(true);
			expect(state.showAnswer).toEqual(false);
		});
	});
});
