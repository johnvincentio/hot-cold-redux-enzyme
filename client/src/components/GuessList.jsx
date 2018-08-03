//

import React from 'react';
import PropTypes from 'prop-types';

import './guessList.scss';

export default function GuessList(props) {
	const characters = props.guesses.map(guess => <li key={guess}>{guess}</li>);
	return <ul className="guessList clearfix">{characters}</ul>;
}

GuessList.propTypes = {
	guesses: PropTypes.arrayOf(PropTypes.number).isRequired
};
