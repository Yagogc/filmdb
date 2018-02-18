import React, {Component} from 'react';
import {connect} from 'react-redux';


const Toggle = ({messageVisibility}) => (
	<div>
		{messageVisibility &&
			<p>Yo will be seing this if redux action is toggled</p>
		}
		<button>Toggle Me</button>
	</div>
);

const mapStateToProps = state => ({
	messageVisibility: state.message.messageVisibility,
})

export default connect(mapStateToProps)(Toggle);