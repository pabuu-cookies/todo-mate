const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { validateRequest, authenticateUser } = require('../middlewares');
const { validationSchemas } = require('../utils');

// Register new user
console.log('✅ authRoutes loaded');

router.post(
  '/register',
  validateRequest(validationSchemas.registerSchema),
  authController.register
);

router.get(
  '/profile',
  authenticateUser,
  authController.getProfile
);

// Login user
router.post(
  '/login',
  validateRequest(validationSchemas.loginSchema),
  authController.login
);

module.exports = router;