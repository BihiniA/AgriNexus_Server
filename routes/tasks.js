const express = require('express');
const router = express.Router();
const Task = require('../models/task'); // Assuming Task model is in ../models/Task.js

// --- CRUD Operations ---

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks); // 200 OK is the default, but being explicit is good
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Server error' }); // Consistent error format
  }
});

// GET a single task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      // Handle invalid ObjectIDs (Mongoose specific)
      return res.status(400).json({ error: 'Invalid Task ID format' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// CREATE a new task
router.post('/', async (req, res) => {
  const { ID, Task_name, Task_status, Task_Priority, Due_date, Activities, Assignee } = req.body; // Destructuring for cleaner code

  const task = new Task({
    ID,
    Task_name,
    Task_status,
    Task_Priority,
    Due_date,
    Activities,
    Assignee
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask); // 201 Created for successful resource creation
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Validation error', errors });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE a task by ID
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update fields - more concise way using Object.keys and a loop
    Object.keys(req.body).forEach(key => {
      if (key in task) {
        task[key] = req.body[key];
      }
    });

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Validation error', errors });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid Task ID format' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id); // Use findByIdAndDelete
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid Task ID format' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;