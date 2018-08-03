//

/* global describe, it */

import React from 'react';
import { shallow } from 'enzyme';

import { Game } from '../../../src/components/Game';

describe('<Game />', () => {
	const guesses = [45, 32, 99];
	const text = 'Almost got it right';

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<Game guesses={guesses} text={text} />);
		});
	});
});
