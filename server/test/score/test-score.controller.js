
/* global describe, it, before, after */

/* eslint-disable strict */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */

const chai = require('chai');
const chaiHttp = require('chai-http');

// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;

const { app, runServer, closeServer } = require('../../server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Scores', function () {
	before(function () {
		return runServer();
	});

	after(function () {
		return closeServer();
	});

	describe('GET endpoint', () => {
		it('should get top score', () => chai.request(app)
			.get('/api/score/get')
			.then((res) => {
				res.should.have.status(200);
				res.should.be.json;
				expect(res.body.score).to.equal(99);
			}));
	});

	describe('POST endpoint', () => {
		it('should set top score', () => {
			const newScore = { score: 25 };
			chai.request(app)
				.post('/api/score/send')
				.send(newScore)
				.then((res) => {
					res.should.have.status(200);
					res.should.be.json;
					expect(res.body.score).to.equal(25);
				});
		});

		it('should not set top score', () => {
			const newScore = { score: 26 };
			chai.request(app)
				.post('/api/score/send')
				.send(newScore)
				.then((res) => {
					res.should.have.status(200);
					res.should.be.json;
					expect(res.body.score).to.equal(25);
				});
		});

		it('should not set top score', () => {
			const newScore = { score: -5 };
			chai.request(app)
				.post('/api/score/send')
				.send(newScore)
				.then((res) => {
					res.should.have.status(200);
					res.should.be.json;
					expect(res.body.score).to.equal(25);
				});
		});
	});
});
