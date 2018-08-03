//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow } from 'enzyme';

import { HotCold } from '../../../src/components/HotCold';
import Game from '../../../src/components/Game';

describe('HotCold', () => {
	const showHelp = false;
	const actions = {
		newGame: jest.fn(),
		toggleHelp: jest.fn()
	};

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<HotCold showHelp={showHelp} actions={actions} />);
		});

		it('Renders Game component', () => {
			const wrapper = shallow(<HotCold showHelp={showHelp} actions={actions} />);
			expect(wrapper.contains(<Game />)).toBe(true);
		});
	});
});
