//

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

import './guessForm.scss';

class GuessForm extends React.Component {
	handleGuess = () => {
		const input = this.guessInput.value;
		if (input === '?') {
			this.props.actions.toggleAnswer();
			return;
		}

		const guess = parseInt(input, 10);
		if (!Number.isNaN(guess)) {
			const num = guess * 1;
			if (num > 0 && num < 100) {
				this.props.actions.handleGuess(num);
			}
		}
		this.guessInput.value = '';
	};

	render() {
		return (
			<div>
				{!this.props.victory && (
					<form className="guessForm" onSubmit={e => e.preventDefault()}>
						<input
							type="text"
							name="userGuess"
							id="userGuess"
							className="text"
							maxLength="3"
							autoComplete="off"
							placeholder="Enter your Guess"
							ref={input => {
								this.guessInput = input;
							}}
							autoFocus
						/>
						<button onClick={this.handleGuess}>Guess</button>
					</form>
				)}
				{this.props.showAnswer && <p>Answer is {this.props.answer}</p>}
			</div>
		);
	}
}

GuessForm.propTypes = {
	answer: PropTypes.number.isRequired,
	victory: PropTypes.bool.isRequired,
	showAnswer: PropTypes.bool.isRequired,
	actions: PropTypes.shape({
		handleGuess: PropTypes.func.isRequired,
		toggleAnswer: PropTypes.func.isRequired
	}).isRequired
};

function mapStateToProps(state) {
	// console.log('GuessForm::mapStateToProps, state ', state);
	return {
		guesses: state.guesses,
		answer: state.answer,
		text: state.text,
		victory: state.victory,
		showHelp: state.showHelp,
		showAnswer: state.showAnswer
	};
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GuessForm);
