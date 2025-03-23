const express = require('express');
const mongoose = require('mongoose');
const taskRouter = require('./routes/tasks'); // Path to your task.js file

const app = express();
const port = 8000;

mongoose.connect('mongodb+srv://AgriNexus:AgriNexus123@agrinexus.lldxe.mongodb.net/?retryWrites=true&w=majority&appName=AgriNexus', { // Replace with your MongoDB connection string
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/tasks', taskRouter); // Mount the task router at the /tasks path

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});