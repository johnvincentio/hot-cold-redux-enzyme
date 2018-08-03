/**
 * Handle tasks related to routing requests for User requesting contact
 *
 * @module contactRouter
 * @requires express
 * @requires contactController
 * @requires joi
 * @requires JVValidator
 */

const router = require('express').Router();
const { getScore, sendScore } = require('./score.controller');

const Joi = require('joi');
const validator = require('../../config/jv-validator.js')({ Joi });

const schema = Joi.object().keys({
	score: Joi.number().required(),
});
const joiOpts = {
	allowUnknown: false,
};

// router
// 	.route('/send')
// 	.post(sendScore);

router
	.route('/send')
	.all(validator.body(schema, { joi: joiOpts }))
	.post(sendScore);

router.route('/get').get(getScore);

module.exports = router;
