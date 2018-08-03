//

import React from 'react';
import PropTypes from 'prop-types';

import './feedback.scss';

const Feedback = props => <h2 className="feedback-title">{props.feedback}</h2>;

Feedback.propTypes = {
	feedback: PropTypes.string.isRequired
};

export default Feedback;
