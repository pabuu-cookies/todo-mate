const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { HTTP_STATUS, HTTP_MESSAGE } = require('../utils/httpMessages');

const generateToken = (userId) => {
  console.log('✌ Generating JWT token ✌');
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

const registerUser = async (userData) => {
  console.log('✌ Registering new user ✌');
  
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    console.log('❌ User already exists with email:', userData.email);
    return {
      error: {
        statusCode: HTTP_STATUS.CONFLICT,
        message: HTTP_MESSAGE.USER_EXISTS
      }
    };
  }

  // Create new user
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: userData.password
  });

  await user.save();
  console.log('✅ User registered successfully:', user.email);

  // Generate token
  const token = generateToken(user._id);

  return {
    message: HTTP_MESSAGE.SIGNUP_SUCCESS,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
};

const getUserProfile = async (userId) => {
  console.log('✌ Fetching user profile ✌');
  const user = await User.findById(userId); 
  if (!user) {  
    console.log('❌ User not found with ID:', userId);
    return {
      error: {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: HTTP_MESSAGE.USER_NOT_FOUND
      }
    };
  }
  console.log('✅ User profile fetched successfully:', user.email);
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };  
};

const loginUser = async (credentials) => {
  console.log('✌ Attempting user login ✌');
  
  // Find user by email
  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    console.log('❌ User not found with email:', credentials.email);
    return {
      error: {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: HTTP_MESSAGE.INVALID_CREDENTIALS
      }
    };
  }

  // Check password
  const isMatch = await user.comparePassword(credentials.password);
  if (!isMatch) {
    console.log('❌ Password does not match for user:', credentials.email);
    return {
      error: {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: HTTP_MESSAGE.INVALID_CREDENTIALS
      }
    };
  }

  console.log('✅ User logged in successfully:', user.email);

  // Generate token
  const token = generateToken(user._id);

  return {
    message: HTTP_MESSAGE.LOGIN_SUCCESS,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
};

module.exports = {
  registerUser,
  loginUser, 
  getUserProfile
};