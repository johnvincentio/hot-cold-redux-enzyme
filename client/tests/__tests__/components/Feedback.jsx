//

/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';

import { Feedback } from '../../../src/components';

describe('<Feedback />', () => {
	const text = 'Almost got it right';

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<Feedback feedback={text} />);
		});
	});

	describe('properties-state', () => {
		it('Renders h2', () => {
			const wrapper = shallow(<Feedback feedback={text} />);
			expect(wrapper.find('h2').text()).toEqual(text);
		});
	});

	describe('content', () => {
		it('Renders classname feedback-title', () => {
			const wrapper = shallow(<Feedback feedback={text} />);
			expect(wrapper.hasClass('feedback-title')).toEqual(true);
		});
	});
});
