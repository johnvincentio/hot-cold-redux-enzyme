//

import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

import Game from './Game';
import Help from './Help';
import Navigation from './Navigation';

export class HotCold extends React.Component {
	toggleGame() {
		this.props.actions.newGame();
	}

	toggleHelp() {
		this.props.actions.toggleHelp();
	}

	render() {
		return (
			<div>
				{!this.props.showHelp && (
					<Navigation toggleHelp={() => this.toggleHelp()} toggleGame={() => this.toggleGame()} />
				)}
				{this.props.showHelp && <Help toggleHelp={() => this.toggleHelp()} />}
				{!this.props.showHelp && <Game />}
			</div>
		);
	}
}

HotCold.propTypes = {
	showHelp: PropTypes.bool.isRequired,
	actions: PropTypes.shape({
		newGame: PropTypes.func.isRequired,
		toggleHelp: PropTypes.func.isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	showHelp: state.showHelp
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HotCold);
