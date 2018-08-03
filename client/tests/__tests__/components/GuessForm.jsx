//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { GuessForm } from '../../../src/components';

describe('<GuessForm />', () => {
	const handleGuess = jest.fn();
	const answer = 79;
	const victory = false;

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<GuessForm handleGuess={handleGuess} answer={answer} victory={victory} />);
		});
	});

	describe('content', () => {
		it('Renders classname guessForm', () => {
			const wrapper = shallow(
				<GuessForm handleGuess={handleGuess} answer={answer} victory={victory} />
			);
			expect(wrapper.find('form').hasClass('guessForm')).toEqual(true);
			expect(wrapper.find('p').exists()).toBeFalsy();
		});
	});

	describe('properties-state', () => {
		it('Check state', () => {
			const wrapper = shallow(
				<GuessForm handleGuess={handleGuess} answer={answer} victory={victory} />
			);
			expect(wrapper.state().showAnswer).toEqual(false);
		});

		it('Victory found', () => {
			const truth = true;
			const wrapper = shallow(
				<GuessForm handleGuess={handleGuess} answer={answer} victory={truth} />
			);
			expect(wrapper.find('form').exists()).toBeFalsy();
		});

		it('Find the button', () => {
			const wrapper = shallow(
				<GuessForm handleGuess={handleGuess} answer={answer} victory={victory} />
			);
			expect(wrapper.find('button').text()).toEqual('Guess');
		});
	});

	describe('callbacks-events', () => {
		it('Find the button', () => {
			const callback = jest.fn();
			mount(<GuessForm handleGuess={callback} answer={answer} victory={victory} />);
			expect(callback).not.toHaveBeenCalled();
		});

		it('Fire the button', () => {
			const callback = jest.fn();
			const wrapper = mount(<GuessForm handleGuess={callback} answer={answer} victory={victory} />);
			const value = 10;
			wrapper.find('input[type="text"]').instance().value = value;
			expect(wrapper.find('button').text()).toEqual('Guess');
			wrapper.find('button').simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(value);
		});

		it('Should reset input', () => {
			const callback = jest.fn();
			const wrapper = mount(<GuessForm handleGuess={callback} answer={answer} victory={victory} />);
			const input = wrapper.find('input[type="text"]');
			input.instance().value = 10;
			wrapper.find('button').simulate('click');
			expect(input.instance().value).toEqual('');
		});

		it('Ask for Help', () => {
			const callback = jest.fn();
			const wrapper = mount(<GuessForm handleGuess={callback} answer={answer} victory={victory} />);
			expect(wrapper.find('p').exists()).toBeFalsy();
			wrapper.find('input[type="text"]').instance().value = '?';
			wrapper.find('button').simulate('click');
			expect(callback).not.toHaveBeenCalled();
			expect(wrapper.state().showAnswer).toEqual(true);
			expect(wrapper.find('p').exists()).toBeTruthy();

			wrapper.find('button').simulate('click');
			expect(callback).not.toHaveBeenCalled();
			expect(wrapper.state().showAnswer).toEqual(false);
			expect(wrapper.find('p').exists()).toBeFalsy();
		});
	});
});
