import React from 'react';

const Input = ({newtodo, onChange, onSubmit}) => {
	return (
		<form onSubmit={onSubmit}>
			<div>
				<label>Email address</label>
				<input placeholder="输入添加项" onChange={onChange}/>
				<button>添加</button>
				{newtodo}
			</div>
		</form>
	)
}

export default Input;