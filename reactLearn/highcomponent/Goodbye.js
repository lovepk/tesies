import React, {
	Component
} from 'react';

import wrapWithUsername from 'wrapWithUsername';

class Goodbye extends Component {
	render() {
		return (
			<div>goodbye {this.props.username}</div>
		)
	}
}
Goodbye = wrapWithUsername(Goodbye);

export default Goodbye;