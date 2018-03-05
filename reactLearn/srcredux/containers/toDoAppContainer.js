import { connect } from 'react-redux';
import ToDoApp from '../components/ToDoApp.js';
import { 
	inputChange,
	inputSubmit,
	deleteListItem,
	listItemClick 
} from '../redux/modules/toDoApp';

function mapStateToProps(state) {
	console.log(state)
	return {
		toDoApp: state.toDoApp
	}
}

function mapDispatchToProps(dispatch) {
	return {
		inputChange: (value) => dispatch(inputChange(value)),
		inputSubmit: () => dispatch(inputSubmit()),
		deleteListItem: (i) => dispatch(deleteListItem(i)),
		listItemClick: (i) => dispatch(listItemClick(i))
	};
}

//连接React组件与 Redux store
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ToDoApp);