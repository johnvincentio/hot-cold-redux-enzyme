//

import React from 'react';
import PropTypes from 'prop-types';

import './navigation.scss';

export default function Navigation(props) {
	return (
		<header className="navigation">
			<nav>
				<ul className="clearfix">
					<li>
						<button onClick={props.toggleHelp}>What?</button>
					</li>
					<li>
						<button onClick={props.toggleGame}>+ New Game</button>
					</li>
				</ul>
			</nav>
			<h1>HOT or COLD</h1>
		</header>
	);
}

Navigation.propTypes = {
	toggleHelp: PropTypes.func.isRequired,
	toggleGame: PropTypes.func.isRequired
};
