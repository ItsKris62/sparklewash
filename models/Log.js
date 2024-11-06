const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false  // Make it optional since not all requests will be authenticated
  },
  action: { type: String, required: true },
  path: { type: String, required: true },
  method: { type: String, required: true },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
  status: { type: Number }  // Make it optional since you might want to log before response
});

module.exports = mongoose.model('Log', logSchema);