/**
 * Setup Globals
 *
 * @module config
 * @requires dotenv
 */

require('dotenv').config();

exports.LOG_ENV = process.env.LOG_ENV || 'prod'; // 'dev', 'prod', 'heroku'

exports.LOG_LEVEL = process.env.LOG_LEVEL || 'info';

exports.LOG_FILE = process.env.LOG_FILE || 'logfile.txt';

exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost/hot-cold';

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/hot-cold-test';

exports.PORT = process.env.PORT || 3001;
