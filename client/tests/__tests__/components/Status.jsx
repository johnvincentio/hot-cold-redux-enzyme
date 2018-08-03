//

/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';

import { Status } from '../../../src/components';

describe('<Status />', () => {
	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<Status count={5} />);
		});
	});

	describe('content', () => {
		it('Renders classname status', () => {
			const wrapper = shallow(<Status count={5} />);
			expect(wrapper.hasClass('status')).toEqual(true);
		});
	});

	describe('properties-state', () => {
		it('Renders property count', () => {
			const count = 12;
			const wrapper = shallow(<Status count={count} />);
			expect(wrapper.contains(<span>{count}</span>)).toEqual(true);
		});
	});
});
