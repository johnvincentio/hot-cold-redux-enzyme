//

import React from 'react';
import PropTypes from 'prop-types';

import './status.scss';

const Status = props => (
	<p className="status">
		Guess #<span>{props.count}</span>!
	</p>
);

Status.propTypes = {
	count: PropTypes.number.isRequired
};

export default Status;
