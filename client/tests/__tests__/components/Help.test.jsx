//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { Help } from '../../../src/components';

describe('<Help />', () => {
	const toggleHelp = jest.fn();

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<Help toggleHelp={toggleHelp} />);
		});
	});

	describe('content', () => {
		it('Renders classname help', () => {
			const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
			expect(wrapper.hasClass('help')).toEqual(true);
		});
		it('Renders h3', () => {
			const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
			expect(wrapper.find('h3').text()).toEqual('What do I do?');
		});
		it('Renders h3 contains', () => {
			const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
			expect(wrapper.contains(<h3>What do I do?</h3>)).toBeTruthy();
		});

		it('Renders contains ul', () => {
			const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
			expect(
				wrapper
					.find('div')
					.find('div')
					.find('p')
			).toHaveLength(2);
		});
		it('Renders contains ul', () => {
			const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
			expect(wrapper.find('p')).toHaveLength(2);
		});

		it('Renders contains ul', () => {
			const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
			expect(wrapper.find('ul')).toHaveLength(1);
		});
		it('Renders contains li', () => {
			const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
			expect(wrapper.find('li')).toHaveLength(3);
		});
	});

	describe('properties-state', () => {
		it('Find the button', () => {
			const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
			expect(wrapper.find('button').text()).toEqual('Got It!');
		});
	});

	describe('callbacks-events', () => {
		it('Fire the button', () => {
			const callback = jest.fn();
			const wrapper = mount(<Help toggleHelp={callback} />);
			expect(callback).not.toHaveBeenCalled();

			wrapper.find('button').simulate('click');
			expect(callback).toHaveBeenCalled();
		});
	});
});
