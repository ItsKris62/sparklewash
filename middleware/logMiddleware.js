const Log = require('../models/Log');
const logger = require('../utils/logger');

const logAction = (action, description = '') => {
    return async (req, res, next) => {
        // Store the original end function
        const originalEnd = res.end;
        
        // Create base log data
        const logData = {
            action,
            description,
            path: req.path,
            method: req.method,
            timestamp: new Date()
        };

        // Override the end function
        res.end = async function (chunk, encoding) {
            // Restore the original end function
            res.end = originalEnd;
            
            try {
                // Add user if authenticated
                if (req.user) {
                    logData.user = req.user._id;
                }
                
                // Add response status
                logData.status = res.statusCode;

                const logEntry = new Log(logData);
                await logEntry.save();

                // Use Winston logger for console output
                logger.info(`${req.method} ${req.path} - Status: ${res.statusCode}`, {
                    user: req.user ? req.user._id : 'unauthenticated',
                    action,
                    description
                });

            } catch (error) {
                logger.error("Error saving log entry:", error);
            }

            // Call the original end function
            return originalEnd.call(this, chunk, encoding);
        };

        next();
    };
};

module.exports = logAction;