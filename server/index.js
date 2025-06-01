const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const filePath = './todos.json';

// Helper to read and write
const readTodos = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeTodos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

app.get('/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todos = readTodos();
  const newTodo = {
  id: Date.now(),
  date: req.body.date,
  title: req.body.title,
  description: req.body.description,
  completed: false
};
  todos.push(newTodo);
  writeTodos(todos);
  res.json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todos = readTodos();
  const updated = todos.map(todo => todo.id == req.params.id ? { ...todo, ...req.body } : todo);
  writeTodos(updated);
  res.json({ success: true });
});

app.delete('/todos/:id', (req, res) => {
  const todos = readTodos();
  const filtered = todos.filter(todo => todo.id != req.params.id);
  writeTodos(filtered);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
