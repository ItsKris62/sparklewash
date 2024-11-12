// Generates JWT tokens for user authentication.

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token expiration time
  });
};

module.exports = generateToken;
