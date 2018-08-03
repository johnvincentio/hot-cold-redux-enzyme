/**
 * Express Server
 * <pre>
 * 1. Load middleware
 * 2. Load routes
 * 3. Start the server.
 * </pre>
 * @module server
 * @requires express
 * @requires logger
 */

const express = require('express');

const { PORT } = require('./config/config');

const { logger } = require('./config/logger');

const app = express();

let server;

/* eslint-disable no-console */
function runServer() {
	return new Promise((resolve, reject) => {
		server = app
			.listen(PORT, () => {
				console.log(`Your app is listening on port ${PORT}`);
				resolve(server);
			})
			.on('error', (err) => {
				reject(err);
			});
	});
}

function closeServer() {
	return new Promise((resolve, reject) => {
		console.log('Closing server');
		server.close((err) => {
			if (err) {
				reject(err);
				// so we don't also call `resolve()`
				return;
			}
			resolve();
		});
	});
}

if (require.main === module) {
	runServer().catch(err => console.error(err));
}

require('./config/middleware.express')(app);

logger.info('Application middleware is configured');

require('./config/routes')(app);

logger.info('Application routes have been loaded');

module.exports = { app, runServer, closeServer };
logger.info('Application is exported');
