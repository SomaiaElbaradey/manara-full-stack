const { Router } = require("express");
const { data } = require("./data.js");

const router = Router();

router.get("/", (_req, res) => {
    res.json(data.getAllTodos());
});

router.delete("/:id", (req, res) => {
    res.json(data.deleteTodoById(req.params.id));
});

router.post("/todo", (req, res) => {
    res.json(data.create(req.body));
});

module.exports = { router };
