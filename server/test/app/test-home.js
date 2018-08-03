
/* global describe, it, before, after */

/* eslint-disable strict */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */

// 'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../../server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('test-home; index.html', function () {
	before(function () {
		return runServer();
	});

	after(function () {
		return closeServer();
	});

	// it('silly test', function () {
	// 	console.log('silly test');
	// });

	it('should get html', function () {
		return chai.request(app)
			.get('/')
			.then(function (res) {
				res.should.have.status(200);
				res.should.be.html;
			});
	});
});

