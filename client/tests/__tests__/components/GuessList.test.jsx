//

/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';

import { GuessList } from '../../../src/components';

describe('<GuessList />', () => {
	const guesses = [45, 32, 99];

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<GuessList guesses={guesses} />);
		});
	});

	describe('properties-state', () => {
		describe('empty list', () => {
			it('Renders h2', () => {
				const wrapper = shallow(<GuessList guesses={[]} />);
				expect(wrapper.find('ul')).toHaveLength(1);
			});
			it('Renders contains li', () => {
				const wrapper = shallow(<GuessList guesses={[]} />);
				expect(wrapper.find('li').exists()).toBeFalsy();
			});
		});

		describe('non empty list', () => {
			it('Renders h2', () => {
				const wrapper = shallow(<GuessList guesses={guesses} />);
				expect(wrapper.find('ul')).toHaveLength(1);
			});
			it('Renders contains li', () => {
				const wrapper = shallow(<GuessList guesses={guesses} />);
				expect(wrapper.find('li').exists()).toBeTruthy();
				expect(wrapper.find('li')).toHaveLength(guesses.length);
			});
		});

		describe('verify non empty list', () => {
			it('Renders contains li', () => {
				const wrapper = shallow(<GuessList guesses={guesses} />);
				const items = wrapper.find('li');
				expect(items.length).toEqual(guesses.length);
				guesses.forEach((item, index) => {
					expect(items.at(index).text()).toEqual(item.toString());
				});
			});
		});
	});

	describe('content', () => {
		it('Renders classname guessList', () => {
			const wrapper = shallow(<GuessList guesses={guesses} />);
			expect(wrapper.hasClass('guessList')).toEqual(true);
		});
	});
});
