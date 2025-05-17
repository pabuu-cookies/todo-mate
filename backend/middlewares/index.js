const { handleError } = require('./handleError');
const { handleResponse } = require('./handleResponse');
const { authenticateUser } = require('./auth.middleware');
const { validateRequest } = require('./validation.middleware');

module.exports = {
  handleError,
  handleResponse,
  authenticateUser,
  validateRequest
};