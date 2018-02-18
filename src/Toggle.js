import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import {toggleMessage} from './actions'

const Toggle = ({messageVisibility, toggleMessage}) => (
	<div>
		{messageVisibility &&
			<p>Yo will be seing this if redux action is toggled</p>
		}
		<button onClick={toggleMessage}>Toggle Me</button>
	</div>
);

const mapStateToProps = state => ({
	messageVisibility: state.message.messageVisibility,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
	toggleMessage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);

