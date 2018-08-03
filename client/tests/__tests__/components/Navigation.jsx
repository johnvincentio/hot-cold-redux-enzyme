//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow } from 'enzyme';

import { Navigation } from '../../../src/components';

describe('<Navigation />', () => {
	const toggleHelp = jest.fn();
	const toggleGame = jest.fn();

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<Navigation toggleHelp={toggleHelp} toggleGame={toggleGame} />);
		});
	});

	describe('content', () => {
		it('Renders classname help', () => {
			const wrapper = shallow(<Navigation toggleHelp={toggleHelp} toggleGame={toggleGame} />);
			expect(wrapper.hasClass('navigation')).toEqual(true);
		});
		it('Renders h1', () => {
			const wrapper = shallow(<Navigation toggleHelp={toggleHelp} toggleGame={toggleGame} />);
			expect(wrapper.find('h1').text()).toEqual('HOT or COLD');
		});
	});

	describe('callbacks-events', () => {
		describe('help button', () => {
			it('Find the button', () => {
				const wrapper = shallow(<Navigation toggleHelp={toggleHelp} toggleGame={toggleGame} />);
				expect(
					wrapper
						.find('button')
						.first()
						.text()
				).toEqual('What?');
			});
			it('Fire the button', () => {
				const callback = jest.fn();
				const wrapper = shallow(<Navigation toggleHelp={callback} toggleGame={toggleGame} />);
				expect(callback).not.toHaveBeenCalled();
				wrapper
					.find('button')
					.first()
					.simulate('click');
				expect(callback).toHaveBeenCalled();
			});
		});

		describe('game button', () => {
			it('Find the button', () => {
				const wrapper = shallow(<Navigation toggleHelp={toggleHelp} toggleGame={toggleGame} />);
				expect(
					wrapper
						.find('button')
						.first()
						.text()
				).toEqual('What?');
			});
			it('Fire the button', () => {
				const callback = jest.fn();
				const wrapper = shallow(<Navigation toggleHelp={toggleHelp} toggleGame={callback} />);
				expect(callback).not.toHaveBeenCalled();
				wrapper
					.find('button')
					.at(1)
					.simulate('click');
				expect(callback).toHaveBeenCalled();
			});
		});
	});
});
