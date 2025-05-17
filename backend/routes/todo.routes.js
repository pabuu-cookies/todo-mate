const express = require('express');
const router = express.Router();
const { todoController } = require('../controllers');
const { authenticateUser, validateRequest } = require('../middlewares');
const { validationSchemas } = require('../utils');

// Apply authentication middleware to all todo routes
router.use(authenticateUser);

// Create a new todo
router.post(
  '/',
  validateRequest(validationSchemas.createTodoSchema),
  todoController.createTodo
);

// Get all todos for the authenticated user
router.get('/', todoController.getAllTodos);

// Update a todo
router.put(
  '/:id',
  validateRequest(validationSchemas.updateTodoSchema),
  todoController.updateTodo
);

// Delete a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;