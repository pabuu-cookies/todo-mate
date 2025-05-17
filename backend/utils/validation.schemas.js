const Joi = require('joi');

// User validation schemas
const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50).messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email'
  }),
  password: Joi.string().required().min(6).messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Confirm password is required'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  })
});

// Todo validation schemas
const createTodoSchema = Joi.object({
  text: Joi.string().required().min(1).max(200).messages({
    'string.empty': 'Todo text is required',
    'string.min': 'Todo text cannot be empty',
    'string.max': 'Todo text cannot exceed 200 characters'
  })
});

const updateTodoSchema = Joi.object({
  text: Joi.string().min(1).max(200).messages({
    'string.min': 'Todo text cannot be empty',
    'string.max': 'Todo text cannot exceed 200 characters'
  }),
  completed: Joi.boolean().messages({
    'boolean.base': 'Completed must be a boolean'
  })
}).min(1); // At least one field must be provided

module.exports = {
  registerSchema,
  loginSchema,
  createTodoSchema,
  updateTodoSchema
};