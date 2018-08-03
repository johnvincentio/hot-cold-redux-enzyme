//

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Feedback from './Feedback';
import GuessForm from './GuessForm';
import GuessList from './GuessList';
import Status from './Status';

import './game.scss';

export const Game = props => (
	<main className="game">
		<Feedback feedback={props.text} />
		<GuessForm />
		<Status count={props.guesses.length} />
		<GuessList guesses={props.guesses} />
	</main>
);

Game.propTypes = {
	guesses: PropTypes.arrayOf(PropTypes.number).isRequired,
	text: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	guesses: state.data.guesses,
	text: state.data.text
});

export default connect(mapStateToProps)(Game);
