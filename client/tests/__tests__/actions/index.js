//

/* global describe, it, expect */

// import { GuessList } from '../../../src/components';
import { NEW_GAME, newGame, TOGGLE_HELP, TOGGLE_ANSWER, HANDLE_GUESS } from '../../../src/actions';

describe('newGame', () => {
	it('Should return the action', () => {
		const action = newGame();
		expect(action.type).toEqual(NEW_GAME);
	});
});

// describe('addCard', () => {
//     it('Should return the action', () => {
//         const text = 'Card text';
//         const listIndex = 10;
//         const action = addCard(text, listIndex);
//         expect(action.type).toEqual(ADD_CARD);
//         expect(action.text).toEqual(text);
//         expect(action.listIndex).toEqual(listIndex);
//     });
// });
