const fs = require("fs");

todos = {};

const data = {
    getAllTodos: () => {
        return todos;
    },

    deleteTodoById: (id) => {
        const deletedTodo = todos[id];
        delete todos[id];
        data.save();
        return deletedTodo;
    },

    load: () => {
        try {
            const raw = fs.readFileSync("data/todos.json");
            todos = JSON.parse(raw);
        } catch (error) {
            console.error("Error loading JSON data:", error);
        }
    },

    create: (response) => {
        try {
            const todoId = Object.keys(todos).length + 1;
            todos[todoId] = { ...response, id: todoId };
            data.save();
        } catch (err) {
            console.error("Error creating TODO:", err);
        }
    },

    save: () => {
        try {
            const raw = JSON.stringify(todos, null, 2);
            fs.writeFileSync("data/todos.json", raw);
        } catch (error) {
            console.error("Error saving JSON data:", error);
        }
    },
};

module.exports = { data };
