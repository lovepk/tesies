import React from 'react';
// 尽管这个文件没有用到React  实际上List函数的效果就是返回React.createElement()方法创建出来的组件， 所以还是要引入。
const List = (props) => {
	const list = props.listItems.map((el, i) => (
		<li key={i}><h2>{el.item}<span style={el.done ? {textDecoration:'line-through', fontSize: '20px'} : {textDecoration:'none', fontSize: '20px'}} 
			onClick={props.onClick.bind(null, i)}
		>代办事项</span><button onClick={props.onDoDel.bind(null, i)}>x</button></h2></li>
	));
	return (
		<div>
			<div>redux</div>
			<ul>
			{
				list
			}
			</ul>
		</div>
	)
};

export default List;