//

export const NEW_GAME = 'NEW_GAME';
export const newGame = () => ({
	type: NEW_GAME
});

export const TOGGLE_HELP = 'TOGGLE_HELP';
export const toggleHelp = () => ({
	type: TOGGLE_HELP
});

export const TOGGLE_ANSWER = 'TOGGLE_ANSWER';
export const toggleAnswer = () => ({
	type: TOGGLE_ANSWER
});

export const HANDLE_GUESS = 'HANDLE_GUESS';
export const handleGuess = guess => ({
	type: HANDLE_GUESS,
	guess
});
