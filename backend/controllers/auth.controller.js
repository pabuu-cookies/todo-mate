const { authService } = require('../services');

const register = async (req, res, next) => {
  try {
    console.log('✌ Register controller called ✌');
    const result = await authService.registerUser(req.body);
    res.locals.responseData = result;
    next();
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    console.log('✌ Get profile controller called ✌');
    const result = await authService.getUserProfile(req.user.id);
    res.locals.responseData = result;
    next();
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    console.log('✌ Login controller called ✌');
    const result = await authService.loginUser(req.body);
    res.locals.responseData = result;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
};