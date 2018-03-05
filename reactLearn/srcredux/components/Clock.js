import React from 'react';
class Clock extends React.Component {
	// prop和state的对比
	// prop用于定义外部接口，state用于记录内部状态。
	// prop的赋值 在外部使用组件时，state的赋值在组件内部。
	// 组件不应该改变prop的值，而state存在的目的就是让组件来改变的
	constructor(props) {
		console.log(props)
		super(props);
		this.state = {
			date: new Date(),
			counter: this.props.desc
		}
	}
	// 组件第一次渲染到DOM时，是挂载
	componentDidMount() {
		// timerID不用于视觉输出的，可以向类中添加字段
		this.timerID = setInterval(
			() => this.tick(),
			1000
		)
		setTimeout(this.asyncCounter.bind(this), 5000)
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	tick() {
		this.setState({
			date: new Date()
		})
	}
	asyncCounter() {
		// 此处state(状态) 更新可能是异步的
		this.setState((prevState, props) => ({
			counter: prevState.date + props.desc
		}))
	}
	// state里的字段都是在render函数中引用的，
	// 如果用不到，就不应该添加到state上
	render() {
		return (
			<div>
				<h2>It is {this.state.date.toLocaleTimeString()}</h2>
				<h3>{this.state.counter}</h3>
			</div>
		)
	}
}

export default Clock;