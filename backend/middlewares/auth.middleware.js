const jwt = require('jsonwebtoken');
const { HTTP_STATUS, HTTP_MESSAGE } = require('../utils/httpMessages');

const authenticateUser = (req, res, next) => {
  console.log('✌ Authenticating user ✌');

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    const error = new Error(HTTP_MESSAGE.TOKEN_REQUIRED);
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('❌ Authentication failed:', err.message);

    const error = new Error(HTTP_MESSAGE.INVALID_TOKEN);
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
    return next(error);
  }
};

module.exports = {
  authenticateUser
};
