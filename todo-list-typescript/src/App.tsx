import React, { useState } from "react";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";

const initialTodos: Todo[] = [
	{
		text: "Walk the dog",
		complete: false,
	},
	{
		text: "Write app",
		complete: true,
	},
];

function App() {
	const [todos, setTodos] = useState(initialTodos);

	const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
		const newTodos = todos.map((todo) => {
			if (todo === selectedTodo)
				return {
					...todo,
					complete: !todo.complete,
				};
			return todo;
		});
		setTodos(newTodos);
	};

	const addTodo: AddTodo = (text: string) => {
		setTodos([...todos, {text: text, complete: false}]);
	}

	return (
		<ul>
			<TodoList todos={todos} toggleTodo={toggleTodo} />
			<AddTodoForm addTodo={addTodo} />
		</ul>
	);
}

export default App;
