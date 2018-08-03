//

class Utils {
	static randomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static handleComment(target, guess) {
		// console.log(`--- Utils.handleComment; guess ${guess} target ${target}`);
		if (guess < 1 || guess > 100) {
			return 'Invalid, please enter a number between 1 and 100';
		}
		const diff = Math.abs(guess - target);
		if (diff > 80) {
			return 'Incredibly frozen';
		}
		if (diff > 60) {
			return 'Very cold';
		}
		if (diff > 40) {
			return 'Cold';
		}
		if (diff > 30) {
			return 'Slightly warm';
		}
		if (diff > 20) {
			return 'Warm';
		}
		if (diff > 10) {
			return 'Hot';
		}
		if (diff > 5) {
			return 'Very hot';
		}
		if (diff > 3) {
			return 'Very, very hot';
		}
		if (diff > 1) {
			return 'Incredibly close';
		}
		if (diff === 1) {
			return 'Just missed';
		}
		if (diff === 0) {
			return 'You Won. Click new game to play again';
		}
		//    console.log('<<< handleComment');
		return 'ERROR in handleComment';
	}
}

module.exports = Utils;
