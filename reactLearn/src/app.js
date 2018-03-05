import React from 'react';
import ReactDOM from 'react-dom';
import ToDoApp from './components/ToDoApp';

class App extends React.Component {
	render() {
		return (
			<ToDoApp />
		)
	}
}
ReactDOM.render(
	<App />,
	document.getElementById('app')
)