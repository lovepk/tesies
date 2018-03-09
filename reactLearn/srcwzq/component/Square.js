import React from 'react';
//Square(方格) 组件不再保持自己的 state(状态) ;它从父级 Board(棋盘) 组件中接收其值，并在点击时通知其父级组件。我们称这些组件为 受控组件
class Square extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<button className="square" onClick={() => this.props.onClick()}>
				{this.props.value}
			</button>
		)
	}
}
export default Square;