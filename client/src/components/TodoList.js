import React, { useState, useEffect } from "react";
import { useInputValidation } from "../hooks";
import { formValidation } from "./validation";

function TodoList() {
    const [todos, setTodos] = useState({});
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: ''
    });

    const titleInput = useInputValidation(formValidation.title, newTodo.title);
    const descriptionInput = useInputValidation(
        formValidation.description,
        newTodo.description
    );

    const baseUrl = "http://localhost:3001/todos";

    useEffect(() => {
        fetch(`${baseUrl}/`)
            .then((response) => response.json())
            .then((data) => {
                setTodos(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.title && newTodo.description) {
            // Make a POST request to the server to add the new todo
            fetch(`${baseUrl}/todo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            })
                .then((response) => response.json())
                .then((_data) => {
                    setNewTodo({}); // Clear the input field
                })
                .catch((error) => console.error("Error adding todo:", error));
        }
    };

    const deleteTodo = (id) => {
        fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                delete todos[id];
                setTodos({ ...todos });
            })
            .catch((err) => console.log(err));
    };

    const isFieldsTouched = titleInput.touched && descriptionInput.touched;
    const isFormNoErr = !titleInput.error && !descriptionInput.error;

    const isFormValid = isFieldsTouched && isFormNoErr;

    return (
        <>
            <h1>To-Do List:</h1>
            <ul id="todo-list">
                {Object.values(todos).map((todo) => (
                    <li key={todo.id} class="todo-item">
                        <ul>
                            <li key={`${todo.id}-title`}>
                                <b>Title: </b>
                                {todo.title}
                            </li>
                            <li key={`${todo.id}-description`}>
                                <b>Description: </b>
                                {todo.description}
                            </li>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                class="delete-button"
                            >
                                Delete
                            </button>
                        </ul>
                    </li>
                ))}
            </ul>
            <h2>Create New To-Do:</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a title for the new todo"
                    value={newTodo.title ?? ""}
                    onChange={(e) => {
                        titleInput.onChange();
                        setNewTodo({ ...newTodo, title: e.target.value });
                    }}
                    onBlur={() => titleInput.onBlur()}
                />
                {titleInput.touched && titleInput.error && (
                    <div className="error-message">{titleInput.error}</div>
                )}

                <input
                    type="text"
                    placeholder="Enter a description for the new todo"
                    value={newTodo.description ?? ""}
                    onChange={(e) => {
                        descriptionInput.onChange();
                        setNewTodo({ ...newTodo, description: e.target.value });
                    }}
                    onBlur={() => descriptionInput.onBlur()}
                />
                {descriptionInput.touched && descriptionInput.error && (
                    <div className="error-message">
                        {descriptionInput.error}
                    </div>
                )}

                <button
                    className={`add-button ${
                        !isFormValid
                            ? "disabled-add-button "
                            : "enabled-add-button "
                    }`}
                    type="submit"
                    disabled={!isFormValid}
                >
                    Add
                </button>
            </form>
        </>
    );
}

export default TodoList;
