//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow } from 'enzyme';

import { Game } from '../../../src/components';

describe('<Game />', () => {
	const handleGuess = jest.fn();
	const guesses = [45, 32, 99];
	const text = 'Almost got it right';

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			const answer = 79;
			const victory = false;
			shallow(
				<Game
					handleGuess={handleGuess}
					guesses={guesses}
					answer={answer}
					text={text}
					victory={victory}
				/>
			);
		});
	});
});
