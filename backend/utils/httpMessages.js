const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

const HTTP_MESSAGE = {
  // Auth messages
  SIGNUP_SUCCESS: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_EXISTS: 'User already exists with this email',
  UNAUTHORIZED: 'Unauthorized access',
  TOKEN_REQUIRED: 'Authentication token is required',
  INVALID_TOKEN: 'Invalid token',
  
  // Todo messages
  TODO_CREATED: 'Todo created successfully',
  TODO_UPDATED: 'Todo updated successfully',
  TODO_DELETED: 'Todo deleted successfully',
  TODO_NOT_FOUND: 'Todo not found',
  TODOS_FETCHED: 'Todos fetched successfully',
  
  // General messages
  VALIDATION_ERROR: 'Validation error',
  SERVER_ERROR: 'Server error',
  NOT_FOUND: 'Resource not found'
};

module.exports = {
  HTTP_STATUS,
  HTTP_MESSAGE
};