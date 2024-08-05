import React, { useState } from "react";

interface Props {
	addTodo: AddTodo;
}

export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
	const [text, setText] = useState("");

	return (
		<form>
			<input
				value={text}
				onChange={(e) => setText(e.target.value)}
				type="text"
			/>
			<button
				onClick={(e) => {
					e.preventDefault();
					addTodo(text);
					setText("");
				}}
				type="submit"
			>
				Save
			</button>
		</form>
	);
};
