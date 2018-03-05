import React from 'react';
import List from './List';
import Input from './Input';
import Clock from './Clock';

// 类组件有生命周期方法和state属性， 而函数组件没有生命周期方法和state属性，它的参数是props
class ToDoApp extends React.Component {
	componentWillMount() {
		// console.log(Math.max.apply(null, [14, 3, 77]))
		// console.log(Math.max(1,2,3,4,5))
	}
	componentDidMount() {
		// setTimeout(function() {
		// 	this.setState({desc: 'shang wu!'})
		// }.bind(this), 3000);
	}
	onInputChange (event){
		this.props.inputChange(event.target.value);
	}
	onInputSubmit (event){
		event.preventDefault();
		this.props.inputSubmit();
	}
	onListItemClick(i) {
		this.props.listItemClick(i);
	}
	onListItemDel(i) {
		this.props.deleteListItem(i);
	}
	render() {
		return (
			<div>
				<Input newtodo={this.props.toDoApp.newToDo} onChange={this.onInputChange.bind(this)} onSubmit={this.onInputSubmit.bind(this)}/>
				<List listItems={this.props.toDoApp.list} onClick={this.onListItemClick.bind(this)} onDoDel={this.onListItemDel.bind(this)}/>
				<Clock desc={this.props.toDoApp.desc}/>
			</div>
		)
	}
}

export default ToDoApp;
