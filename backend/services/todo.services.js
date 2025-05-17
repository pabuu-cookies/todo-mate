const { Todo } = require('../models');
const { HTTP_STATUS, HTTP_MESSAGE } = require('../utils/httpMessages');

const createTodo = async (userId, todoData) => {
  console.log('✌ Creating new todo for user:', userId);
  
  const todo = new Todo({
    text: todoData.text,
    user: userId
  });

  await todo.save();
  console.log('✅ Todo created successfully');

  return {
    message: HTTP_MESSAGE.TODO_CREATED,
    todo
  };
};

const getAllTodos = async (userId) => {
  console.log('✌ Fetching all todos for user:', userId);
  
  const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });
  console.log(`✅ Found ${todos.length} todos`);

  return {
    message: HTTP_MESSAGE.TODOS_FETCHED,
    todos
  };
};

const updateTodo = async (userId, todoId, updateData) => {
  console.log('✌ Updating todo:', todoId);
  
  // Find todo and check ownership
  const todo = await Todo.findOne({ _id: todoId, user: userId });
  
  if (!todo) {
    console.log('❌ Todo not found or not owned by user');
    return {
      error: {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: HTTP_MESSAGE.TODO_NOT_FOUND
      }
    };
  }

  // Update todo
  Object.keys(updateData).forEach(key => {
    todo[key] = updateData[key];
  });

  await todo.save();
  console.log('✅ Todo updated successfully');

  return {
    message: HTTP_MESSAGE.TODO_UPDATED,
    todo
  };
};

const deleteTodo = async (userId, todoId) => {
  console.log('✌ Deleting todo:', todoId);
  
  // Find and delete todo
  const todo = await Todo.findOneAndDelete({ _id: todoId, user: userId });
  
  if (!todo) {
    console.log('❌ Todo not found or not owned by user');
    return {
      error: {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: HTTP_MESSAGE.TODO_NOT_FOUND
      }
    };
  }

  console.log('✅ Todo deleted successfully');

  return {
    message: HTTP_MESSAGE.TODO_DELETED,
    todoId
  };
};

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo
};