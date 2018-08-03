/**
 * Handle routing related tasks
 *
 * @module routes
 * @requires errors
 * @requires scoreRouter
 */

const path = require('path');
const scoreRouter = require('../api/score/score.router');

const errors = require('./errors');

module.exports = (app) => {
	app.use('/api/score', scoreRouter);

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
	});

	// app.use('*', (req, res) => {
	// 	res.status(404).json({ message: 'Not Found' });
	// });
	app.use(errors);
};
