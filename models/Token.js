//Password reset token, password reset functionality, this model tracks password reset tokens.

const mongoose = require('mongoose');

// Token Schema
const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Token expires in 1 hour
  },
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
