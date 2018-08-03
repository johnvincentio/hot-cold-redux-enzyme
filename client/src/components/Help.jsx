//

import React from 'react';
import PropTypes from 'prop-types';

import './help.scss';

export default function Help(props) {
	return (
		<div className="help">
			<div className="content">
				<h3>What do I do?</h3>
				<div>
					<p>This is a Hot or Cold Number Guessing Game. The game goes like this: </p>
					<ul>
						<li>
							1. I pick a <strong>random secret number</strong> between 1 to 100 and keep it hidden.
						</li>
						<li>
							2. You need to <strong>guess</strong> until you can find the hidden secret number.
						</li>
						<li>
							3. You will <strong>get feedback</strong> on how close (&quot;hot&quot;) or far
							(&quot;cold&quot;) your guess is.
						</li>
					</ul>
					<p>So, Are you ready?</p>
					<button onClick={props.toggleHelp}>Got It!</button>
				</div>
			</div>
		</div>
	);
}

Help.propTypes = {
	toggleHelp: PropTypes.func.isRequired
};
