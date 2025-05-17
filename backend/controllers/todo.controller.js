const { todoService } = require('../services');

const createTodo = async (req, res, next) => {
  try {
    console.log('✌ Create todo controller called ✌');
    const result = await todoService.createTodo(req.user.id, req.body);
    res.locals.responseData = result;
    next();
  } catch (error) {
    next(error);
  }
};

const getAllTodos = async (req, res, next) => {
  try {
    console.log('✌ Get all todos controller called ✌');
    const result = await todoService.getAllTodos(req.user.id);
    res.locals.responseData = result;
    next();
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    console.log('✌ Update todo controller called ✌');
    const result = await todoService.updateTodo(req.user.id, req.params.id, req.body);
    res.locals.responseData = result;
    next();
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    console.log('✌ Delete todo controller called ✌');
    const result = await todoService.deleteTodo(req.user.id, req.params.id);
    res.locals.responseData = result;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo
};