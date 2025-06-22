let tasks = require('../models/taskmodel');

// GET /tasks
exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

// GET /tasks/:id
exports.getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    res.json(task);
  };
  

// POST /tasks
exports.createTask = (req, res) => {
    const { title, description, completed } = req.body;
  
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required and must be a non-empty string.' });
    }
  
    if (typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({ message: 'Description is required and must be a non-empty string.' });
    }
  
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'Completed must be a boolean value.' });
    }
  
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title: title.trim(),
      description: description.trim(),
      completed: completed ?? false
    };
  
    tasks.push(newTask);
    res.status(201).json(newTask);
  };  

// PUT /tasks/:id
exports.updateTask = (req, res) => {
    const { title, description, completed } = req.body;
    const task = tasks.find(t => t.id === parseInt(req.params.id));
  
    if (!task) return res.status(404).json({ message: 'Task not found.' });
  
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({ message: 'If provided, title must be a non-empty string.' });
    }
  
    if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
      return res.status(400).json({ message: 'If provided, description must be a non-empty string.' });
    }
  
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'If provided, completed must be a boolean value.' });
    }
  
    task.title = title !== undefined ? title.trim() : task.title;
    task.description = description !== undefined ? description.trim() : task.description;
    task.completed = completed !== undefined ? completed : task.completed;
  
    res.json(task);
  };  

// DELETE /tasks/:id
exports.deleteTask = (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.json({ message: 'Task deleted.', task: deletedTask });
  };
  
