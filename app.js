const express = require('express');
const app = express();
const body_pasrer = require('body-parser');
const PORT = 3000;
const Todos = require('./model');
app.use(body_pasrer.json());


app.get('/', async (req, res) => {
    try {
        const allTodos = await Todos.findAll();
        res.status(200).json({ allTodos });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server Error" });
    }
});

app.get('/:id', async (req, res) => {
    try {
        const todo = await Todos.findByPk(req.params.id);
        res.status(200).json({ todo })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server Error" });
    }
})

app.post('/', async (req, res) => {
    try {
        const todo = req.body
        if (!todo) {
            res.status(400).json({ message: "Bad request" });
        }
        const newTodo = await Todos.create(todo);
        res.status(200).json({ newTodo });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server Error" });
    }
});

app.patch('/:id', async (req, res) => {

    try {
        const todo = req.body;
        if (!todo) {
            res.status(400).json({ message: "Bad request" });
        }
        const upadateToDo = await Todos.findByPk(req.params.id)
        if (!upadateToDo) {
            return res.status(404).json({ error: "node does note real." });
        }
        upadateToDo.Todos = req.body;
        const td = await upadateToDo.save();
        res.status(200).json({ td });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server Error" });
    }
});

app.delete('/:id', async (req, res) => {

    try {
        const todo = await Todos.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "node does note real." });
        }
        const deleted = await todo.destroy();
        res.status(200).json({ deleted })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server Error" });
    }
})



app.listen(PORT, () => {
    console.log('server is listening to ' + PORT);
});