//

/* global describe, it, jest, expect, beforeEach */

import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';

import configureStore from '../../../src/store/configureStore';

import { HotCold } from '../../../src/components';

// import Game from '../../../src/components/Game';
// import Navigation from '../../../src/components/Navigation';
// import Help from '../../../src/components/Help';

import Utils from '../../../src/utils';

describe('HotCold integration', () => {
	let store;

	const showHelp = false;
	const actions = {
		newGame: jest.fn(),
		toggleHelp: jest.fn()
	};
	const toggleGame = jest.fn();
	const toggleHelp = jest.fn();

	beforeEach(() => {
		store = configureStore();
		console.log('beforeEach; store ', store);
	});

	describe.only('smoke-test', () => {
		it('Renders without crashing', () => {
			const wrapper = mount(
				<Provider store={store}>
					<HotCold />
				</Provider>
			);
			// shallow(<HotCold showHelp={showHelp} actions={actions} />);
		});

		// it('Renders Game component', () => {
		// 	const wrapper = shallow(<HotCold showHelp={showHelp} actions={actions} />);
		// 	expect(wrapper.contains(<Game />)).toBe(true);
		// });

		// it('Renders Navigation component', () => {
		// 	const wrapper = shallow(<HotCold showHelp={showHelp} actions={actions} />);
		// 	expect(wrapper.contains(<Navigation toggleHelp={toggleHelp} toggleGame={toggleGame} />)).toBe(
		// 		true
		// 	);
		// });

		// it('1 - Does not render Help component', () => {
		// 	const wrapper = shallow(<HotCold showHelp={showHelp} actions={actions} />);
		// 	expect(wrapper.contains(<Help toggleHelp={toggleHelp} />)).toBe(true);
		// });

		// it('2 - Does not render Help component', () => {
		// 	const wrapper = mount(<HotCold showHelp={showHelp} actions={actions} />);
		// 	expect(wrapper.contains(<Help toggleHelp={toggleHelp} />)).toBe(false);
		// });
	});

	describe.skip('properties-state', () => {
		const answer = 99;

		it('Check initial state', () => {
			const wrapper = shallow(<HotCold showHelp={showHelp} actions={actions} />);
			expect(wrapper.state().guesses).toEqual([]);
			expect(wrapper.state().showHelp).toEqual(false);
			expect(wrapper.state().victory).toEqual(false);
			wrapper.setState({ answer });
			expect(wrapper.state().answer).toEqual(answer);
		});

		it('Feedback', () => {
			const wrapper = mount(<HotCold />);
			wrapper.setState({ answer });
			expect(wrapper.state().answer).toEqual(answer);

			const button = wrapper.find('form > button');
			expect(button.text()).toEqual('Guess');
			const input = wrapper.find('input[type="text"]');

			const value = 10;
			const text = Utils.handleComment(answer, value);
			input.instance().value = value;
			button.simulate('click');
			expect(wrapper.state().text).toEqual(text);
			expect(wrapper.state().guesses.length).toEqual(1);
		});

		it('Feedback for all values', () => {
			const wrapper = mount(<HotCold />);
			wrapper.setState({ answer });
			expect(wrapper.state().answer).toEqual(answer);

			const button = wrapper.find('form > button');
			expect(button.text()).toEqual('Guess');
			const input = wrapper.find('input[type="text"]');

			for (let value = 1; value < 99; value++) {
				const text = Utils.handleComment(answer, value);
				input.instance().value = value;
				button.simulate('click');
				expect(wrapper.state().text).toEqual(text);
				expect(wrapper.state().guesses.length).toEqual(value);
			}
		});

		it('Victory', () => {
			const wrapper = mount(<HotCold />);
			wrapper.setState({ answer });
			expect(wrapper.state().answer).toEqual(answer);

			const button = wrapper.find('form > button');
			expect(button.text()).toEqual('Guess');
			const input = wrapper.find('input[type="text"]');

			const value = answer;
			const text = Utils.handleComment(answer, value);
			input.instance().value = value;
			button.simulate('click');
			expect(wrapper.state().text).toEqual(text);
			expect(wrapper.state().guesses.length).toEqual(1);

			expect(wrapper.state().victory).toEqual(true);
		});
	});
});
