import React from 'react';
import List from './List';
import Input from './Input';
import Clock from './Clock';

// 类组件有生命周期方法和state属性， 而函数组件没有生命周期方法和state属性，它的参数是props
class ToDoApp extends React.Component {
	componentWillMount() {
		console.log(Math.max.apply(null, [14, 3, 77]))
		console.log(Math.max(1,2,3,4,5))
		this.setState({
			list: [{item: 'thing1',done: false, del: false}, {item: 'thing2',done: true, del: false}, {item: 'thing3',done: false, del: false}, {item: 'thing4',done: true, del: false}],
			newToDo: '',
			desc: '上午'
		})	
	}
	componentDidMount() {
		setTimeout(function() {
			this.setState({desc: 'shang wu!'})
		}.bind(this), 3000);
	}
	onInputChange (event){
		this.setState({newToDo: event.target.value});
	}
	onInputSubmit (event){
		event.preventDefault();
		this.setState((previousState) => ({
			list: [...previousState.list, {item: previousState.newToDo, done: false}],
			newToDo: ''
		}))
	}
	onListItemClick(i) {
		this.setState((previousState) => ({
			list: [
				...previousState.list.slice(0, i),
				Object.assign({}, previousState.list[i], {done: !previousState.list[i].done}),
				...previousState.list.slice(i+1)
			]
		}))
	}
	onListItemDel(i) {
		this.setState((previousState) => ({
			list: [
				...previousState.list.slice(0, i),
				...previousState.list.slice(i+1)
			]
		}))
	}
	render() {
		return (
			<div>
				<Input newtodo={this.state.newToDo} onChange={this.onInputChange.bind(this)} onSubmit={this.onInputSubmit.bind(this)}/>
				<List listItems={this.state.list} onClick={this.onListItemClick.bind(this)} onDoDel={this.onListItemDel.bind(this)}/>
				<Clock desc={this.state.desc}/>
			</div>
		)
	}
}

export default ToDoApp;
