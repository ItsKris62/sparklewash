const Log = require('../models/Log');

// Example function to log an action
const logAction = async (actionDescription, userId, extraMetadata = {}) => {
  try {
    await Log.create({
      action: actionDescription,
      user: userId,
      metadata: extraMetadata
    });
  } catch (error) {
    console.error('Failed to create log entry:', error);
  }
};
