const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: [true, 'Task ID is required'] // Custom error message
  },
  Task_name: {
    type: String,
    required: [true, 'Task name is required'],
    trim: true // Removes leading/trailing whitespace
  },
  Task_status: {
    type: String,
    default: 'To Do',
    enum: ['To Do', 'In Progress', 'Completed', 'On Hold'] // Ensures valid status values
  },
  Task_Priority: {
    type: String,
    default: 'Medium',
    enum: ['Low', 'Medium', 'High', 'Urgent'] // Ensures valid priority values
  },
  Due_date: {
    type: Date
  },
  Activities: {
    type: String
  },
  Assignee: {
    type: String
  }
});

module.exports = mongoose.model('Task', taskSchema);