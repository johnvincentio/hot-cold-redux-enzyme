
/**
 * Handle tasks related to the scoring
 *
 * @module scoreController
 * @requires logger
 */

const { logger } = require('../../config/logger');

let lowestScore = 99;

module.exports = {

/**
 * User requests the best score.
 *
 * @method getScore
 * @param {IncomingMessage} req - http request
 * @param {ServerResponse} res - http response
 */
	getScore(req, res) {
		logger.info(`Lowest score sent ${lowestScore}`);
		return res.status(200).json({ score: lowestScore });
	},

	/**
 * User has sent a score
 *
 * <p>If score is lower than current lowest score, set this score to the lowest score.</p>
 *
 * @method sendScore
 * @param {IncomingMessage} req - request
 * @param {ServerResponse} res - response
 */
	sendScore(req, res) {
		logger.info('--- score/score.controller::sendScore');
		const { score } = req.body;
		logger.info(`User sent a score of ${score}`);
		if (score > 0 && score < 101 && score < lowestScore) {
			lowestScore = score;
		}
		logger.info(`Lowest score sent ${lowestScore}`);
		return res.status(200).json({ score: lowestScore });
	},
};
