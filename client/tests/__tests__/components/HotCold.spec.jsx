//

/* global describe, it, jest, expect, beforeEach */

import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';

import configureStore from '../../../src/store/configureStore';

import data from '../../../src/redux/reducers/data.reducer';
import { newGame, toggleHelp, toggleAnswer, handleGuess } from '../../../src/redux/actions';

import { HotCold } from '../../../src/components';

import Game from '../../../src/components/Game';
// import Navigation from '../../../src/components/Navigation';
// import Help from '../../../src/components/Help';

import Utils from '../../../src/utils';

describe.only('HotCold integration', () => {
	let store;
	let state;

	const showHelp = false;
	const actions = {
		newGame: jest.fn(),
		toggleHelp: jest.fn()
	};
	const toggleGame = jest.fn();
	const toggleHelp = jest.fn();

	beforeEach(() => {
		store = configureStore();
		state = store.getState();
		// console.log('beforeEach; store ', store);
		console.log('beforeEach; store.getState() ', store.getState());
	});

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			const wrapper = mount(
				<Provider store={store}>
					<HotCold />
				</Provider>
			);
			expect(wrapper.contains(<Game />)).toBe(true);
		});
	});

	describe.only('properties-state', () => {
		it('Check initial state', () => {
			mount(
				<Provider store={store}>
					<HotCold />
				</Provider>
			);
			expect(state.data.guesses).toEqual([]);
			expect(state.data.showHelp).toEqual(false);
			expect(state.data.victory).toEqual(false);
		});

		it('Feedback', () => {
			const wrapper = mount(
				<Provider store={store}>
					<HotCold />
				</Provider>
			);

			const { answer } = state.data;

			const button = wrapper.find('form > button');
			expect(button.text()).toEqual('Guess');
			const input = wrapper.find('input[type="text"]');

			const value = Math.abs(answer - 1);
			const text = Utils.handleComment(answer, value);
			input.instance().value = value;
			button.simulate('click');

			state = store.getState();
			expect(state.data.text).toEqual(text);
			expect(state.data.guesses.length).toEqual(1);
		});

		// it('Feedback for all values', () => {
		// 	const wrapper = mount(<HotCold />);
		// 	wrapper.setState({ answer });
		// 	expect(wrapper.state().answer).toEqual(answer);

		// 	const button = wrapper.find('form > button');
		// 	expect(button.text()).toEqual('Guess');
		// 	const input = wrapper.find('input[type="text"]');

		// 	for (let value = 1; value < 99; value++) {
		// 		const text = Utils.handleComment(answer, value);
		// 		input.instance().value = value;
		// 		button.simulate('click');
		// 		expect(wrapper.state().text).toEqual(text);
		// 		expect(wrapper.state().guesses.length).toEqual(value);
		// 	}
		// });

		// it('Victory', () => {
		// 	const wrapper = mount(<HotCold />);
		// 	wrapper.setState({ answer });
		// 	expect(wrapper.state().answer).toEqual(answer);

		// 	const button = wrapper.find('form > button');
		// 	expect(button.text()).toEqual('Guess');
		// 	const input = wrapper.find('input[type="text"]');

		// 	const value = answer;
		// 	const text = Utils.handleComment(answer, value);
		// 	input.instance().value = value;
		// 	button.simulate('click');
		// 	expect(wrapper.state().text).toEqual(text);
		// 	expect(wrapper.state().guesses.length).toEqual(1);

		// 	expect(wrapper.state().victory).toEqual(true);
		// });
	});
});
