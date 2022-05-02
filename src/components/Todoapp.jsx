import React, { useReducer, useState } from 'react';

const initialState = [];

const reducer = (state, action) => {
	switch (action.type) {
		case 'add':
			if (action.item.title == '') {
				return state;
			}
			return [...state, action.item];
		case 'done':
			state.splice(action.index, 1);
			return [
				...state,
				{
					title: action.item.title,
					done: !action.item.done,
				},
			];
		case 'delete':
			let newState = state.filter((item, index) => index !== action.index);
			return newState;
		default:
			return state;
	}
};

export default function Todoapp() {
	const [newItem, setNewItem] = useState({
		title: '',
		done: false,
	});

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({
			type: 'add',
			item: newItem,
		});
		setNewItem({
			title: '',
			done: false,
		});
	};

	const handleChange = (e) => setNewItem({ ...newItem, title: e.target.value });

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' value={newItem.title} onChange={handleChange} />
				<input
					type='submit'
					value='Submit'
					style={{
						border: 'none',
						padding: '0.25rem',
						backgroundColor: 'blue',
						color: 'white',
					}}
				/>
			</form>
			<ul>
				{state.map((i, index) =>
					i.done == false ? (
						<li style={{ listStyle: 'none' }} key={index}>
							<p
								style={{ cursor: 'pointer' }}
								onClick={() => {
									dispatch({
										type: 'done',
										index: index,
										item: i,
									});
								}}
							>
								{i.title}
							</p>
							<button
								style={{
									backgroundColor: 'black',
									border: 'none',
									padding: '0.25rem',
									color: 'white',
								}}
								onClick={() => {
									dispatch({
										type: 'delete',
										index: index,
									});
								}}
							>
								Delete
							</button>
						</li>
					) : (
						<li style={{ listStyle: 'none' }} key={index}>
							<p
								style={{
									cursor: 'pointer',
                  textDecoration: 'line-through'
								}}
								onClick={() => {
									dispatch({
										type: 'done',
										index: index,
										item: i,
									});
								}}
							>
								{i.title}
							</p>
							<button
								style={{
									backgroundColor: 'black',
									border: 'none',
									padding: '0.25rem',
									color: 'white',
								}}
								onClick={() => {
									dispatch({
										type: 'delete',
										index: index,
									});
								}}
							>
								Delete
							</button>
						</li>
					)
				)}
			</ul>
		</div>
	);
}
