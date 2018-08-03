/**
 * Use winston to implement logger
 *
 * Levels are:
 * error, warn, info, verbose, debug, silly.
 * and in that order.
 * Thus, if set level='info' => only log error, warn, info.
 *
 * @module logger
 * @requires winston
 */

const winston = require('winston');

const { LOG_LEVEL, LOG_ENV, LOG_FILE } = require('./config');

console.log(`LOG_LEVEL ${LOG_LEVEL}`);
console.log(`LOG_ENV ${LOG_ENV}`);

const consoleOptions = {
	level: LOG_LEVEL,
	handleExceptions: true,
	// json: true,
	colorize: true,
};
const fileOptions = {
	level: LOG_LEVEL,
	filename: LOG_FILE,
	handleExceptions: true,
	// json: true,
	colorize: true,
};

const logger = (function () {
	if (LOG_ENV === 'production') {
		return new winston.Logger({
			transports: [new winston.transports.File(fileOptions)],
		});
	} else if (LOG_ENV === 'heroku') {
		return new winston.Logger({
			transports: [new winston.transports.Console(consoleOptions)],
		});
	}
	return new winston.Logger({
		// dev
		transports: [
			new winston.transports.Console(consoleOptions),
			new winston.transports.File(fileOptions),
		],
	});
}());

logger.stream = {
	write: (message, encoding) => {
		logger.debug(message);
	},
};

module.exports = {
	logger,
};

/*
const logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)(consoleOptions),
    ]
});
*/
