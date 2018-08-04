//

/* global describe, it, expect, beforeEach */

import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';

import configureStore from '../../../src/store/configureStore';

import { HotCold } from '../../../src/components';

import Game from '../../../src/components/Game';

import Utils from '../../../src/utils';

describe('HotCold integration', () => {
	let store;
	let state;

	beforeEach(() => {
		store = configureStore();
		state = store.getState();
		// console.log('beforeEach; store ', store);
		// console.log('beforeEach; store.getState() ', store.getState());
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

	describe('properties-state', () => {
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

		it('Feedback for all values', () => {
			const wrapper = mount(
				<Provider store={store}>
					<HotCold />
				</Provider>
			);

			const { answer } = state.data;

			const button = wrapper.find('form > button');
			expect(button.text()).toEqual('Guess');
			const input = wrapper.find('input[type="text"]');

			for (let value = 1, cntr = 0; value < 99; value++) {
				if (value !== answer) {
					const text = Utils.handleComment(answer, value);
					input.instance().value = value;
					button.simulate('click');

					state = store.getState();
					expect(state.data.text).toEqual(text);
					expect(state.data.guesses.length).toEqual(++cntr);
				}
			}
		});

		it('Victory', () => {
			const wrapper = mount(
				<Provider store={store}>
					<HotCold />
				</Provider>
			);

			const { answer } = state.data;

			const button = wrapper.find('form > button');
			expect(button.text()).toEqual('Guess');
			const input = wrapper.find('input[type="text"]');

			const value = answer;
			const text = Utils.handleComment(answer, value);
			input.instance().value = value;
			button.simulate('click');

			state = store.getState();
			expect(state.data.text).toEqual(text);
			expect(state.data.guesses.length).toEqual(1);
			expect(state.data.victory).toEqual(true);
		});
	});
});
