const { HTTP_STATUS, HTTP_MESSAGE } = require('../utils/httpMessages');

const validateRequest = (schema) => {
  return (req, res, next) => {
    console.log('✌ Validating request data ✌', req.body);
    
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      console.log('❌ Validation error:', errorMessages);
      
      const validationError = new Error(HTTP_MESSAGE.VALIDATION_ERROR);
      validationError.statusCode = HTTP_STATUS.BAD_REQUEST;
      validationError.message = errorMessages;

      return next(validationError);
    }

    next();
  };
};

module.exports = {
  validateRequest
};
