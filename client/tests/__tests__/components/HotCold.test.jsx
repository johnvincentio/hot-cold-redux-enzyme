//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { HotCold } from '../../../src/components/HotCold';
import Utils from '../../../src/utils';

describe('<HotCold />', () => {
	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			const showHelp = false;
			const actions = {
				newGame: jest.fn(),
				toggleHelp: jest.fn()
			};
			shallow(<HotCold showHelp={showHelp} actions={actions} />);
		});
	});

	describe.skip('properties-state', () => {
		const answer = 99;

		it('Check initial state', () => {
			const wrapper = shallow(<HotCold />);
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
