// redux的元素。简单来说只需要记住四个概念：types,actions,action creators,reducers
// 把这些元素用ducks的文件组织结构组织起来就可以了。

//types
const INPUT_CHANGED = 'INPUT_CHANGED',
	INPUT_SUBMIT 	= 'INPUT_SUBMIT',
	LIST_ITEM_CLICK = 'LIST_ITEM_CLICK',
	DELETE_LIST_ITEM = 'DELETE_LIST_ITEM';

//action creators
export function listItemClick(index) {
	// 返回action（一个至少包含type属性的简单的js对象）
	return {
		type: LIST_ITEM_CLICK,
		index
	}
}

export function deleteListItem(index) {
	return {
		type: DELETE_LIST_ITEM,
		index
	}
}

export function inputSubmit() {
	return {
		type: INPUT_SUBMIT,
		index
	}
}

export function inputChange(value) {
	return {
		type: INPUT_CHANGED,
		value
	}
}

const initialState = {
	list: [{item: 'thing-a',done: false, del: false}, {item: 'thing-b',done: true, del: false}, {item: 'thing-c',done: false, del: false}, {item: 'thing-d',done: true, del: false}],
	newToDo: '',
	desc: '上午'
};

//reducer是唯一可以触碰store的元素
//1）用户进行点击（click）、输入（input）等事件，子组件通过callback调用最外层组件的自定义事件 
//2）最外层组件（容器组件）自定义事件的callback被触发，callback中执行dispatch（actions creators(data)） 
//3）store监听到action被触发，执行相应的reducer，state被改变 
//4）页面render
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case INPUT_SUBMIT: 
		// 执行对应的reducer
			return Object.assign(
				{},
				state,
				{
					list:[...state.list, {item: state.newToDo, done: false}],
					newToDo: ''
				}
			)
			break;
		case INPUT_CHANGED: 
			return Object.assign(
				{},
				state,
				{newToDo: action.value}
			)
			break;
		case LIST_ITEM_CLICK: 
			return Object.assign(
				{},
				state,
				{
					list:[
						...state.list.slice(0, action.index),
						Object.assign({}, state.list[action.index], {done: !state.list[action.index].done}),
						...state.list.slice(action.index+1)
					]
				}
			)
			break;
		case DELETE_LIST_ITEM: 
			return Object.assign(
				{},
				state,
				{
					list: [
						...state.list.slice(0, action.index),
						...state.list.slice(action.index+1)
					]
				}
			)
		default:
			return state;
	}
}