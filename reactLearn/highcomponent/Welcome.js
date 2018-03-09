import React, {
	Component
} from 'react';

import wrapWithUsername from 'wrapWithUsername';

class Welcome extends Component {
	render() {
		return (
			<div>Welcome {this.state.username}</div>
		)
	}
}
Welcome = wrapWithUsername(Welcome);
export default Welcome;