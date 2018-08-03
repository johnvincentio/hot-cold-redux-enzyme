/**
 * Handle middleware related tasks
 *
 * @module middlewareExpress
 * @requires express
 * @requires morgan
 * @requires body-parser
 * @requires path
 * @requires mongoose
 * @requires express-handlebars
 * @requires cookie-parser
 * @requires serve-favicon
 * @requires logger
 * @requires passport
 * @requires passport-facebook
 */

const express = require('express');
// const proxy = require('http-proxy-middleware');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { logger } = require('./logger');

const listCookies = (req, res, next) => {
	logger.debug('Cookies: ', req.cookies); // Cookies that have not been signed
	logger.debug('Signed Cookies: ', req.signedCookies); // Cookies that have been signed
	next();
};

const logRequest = (req, res, next) => {
	const logObj = {
		time: new Date().toTimeString(),
		method: req.method,
		hostname: req.hostname,
		path: req.path,
		'content type': req.get('Content-Type'),
		query: JSON.stringify(req.query),
		body: JSON.stringify(req.body),
	};
	Object.keys(logObj).forEach(key => logger.debug(`request ${key}: ${logObj[key]}`));
	next();
};

module.exports = (app) => {
	mongoose.Promise = global.Promise;

	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		if (req.method === 'OPTIONS') {
			logger.debug('Request method = "OPTIONS"');
			res.end();
		} else {
			next();
		}
	});

	app.use(morgan('common', { stream: logger.stream }));

	app.use(express.static(path.resolve(__dirname, '../../client/dist/')));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(cookieParser());

	app.all('*', logRequest);
	app.all('*', listCookies);
};

// app.use(proxy('/api/', {
// 	target: 'http://localhost:8025',
// 	// target: 'https://jsonbin.org',
// 	logLevel: 'debug', // Keep the logs clean
// 	ws: true, // Proxy websockets too
// 	// router: {
// 	// 	// Anything to /api goes to our backend
// 	// 	'localhost:8025/api': 'http://localhost:3001',
// 	// },
// 	changeOrigin: true,
// }));

// app.use(proxy('http://localhost:8025/', {
// 	logLevel: 'warn', // Keep the logs clean
// 	ws: true, // Proxy websockets too
// 	router: {
// 		// Anything to /api goes to our backend
// 		'localhost:8025/api': 'http://localhost:3001',
// 	},
// }));

// app.use(proxy('http://localhost:8025/', {
// 	logLevel: 'warn', // Keep the logs clean
// 	ws: true, // Proxy websockets too
// 	router: {
// 		// Anything to /api goes to our backend
// 		'localhost:8025/api': 'http://localhost:3001',
// 	},
// }));
