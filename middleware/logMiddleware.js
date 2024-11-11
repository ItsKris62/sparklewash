// middleware/logMiddleware.js
const Log = require('../models/Log');
const logger = require('../utils/logger');

const logAction = (action, type, description = '', metadata = {}) => {
    return async (req, res, next) => {
        const originalEnd = res.end;
        
        const logData = {
            action,
            type,                   // Type of log: 'user', 'order', or 'system'
            description,
            path: req.path,
            method: req.method,
            timestamp: new Date(),
            metadata
        };

        // override res.end to capture response after sending
        res.end = async function (chunk, encoding) {
            res.end = originalEnd;
            try {
                if (req.user) logData.user = req.user._id;  // Attach user ID if available
                logData.status = res.statusCode;
                logData.metadata.ip = req.ip;
                logData.metadata.browser = req.headers['user-agent'];

                // Save log entry to database
                const logEntry = new Log(logData);
                await logEntry.save();

                 // Save log to database
        await Log.create(logData);

                // Log to console using Winston for additional insight
                logger.info(`${req.method} ${req.path} - Status: ${res.statusCode}`, {
                    user: req.user ? req.user._id : 'unauthenticated',
                    action,
                    description,
                    type
                });

            } catch (error) {
                logger.error("Error saving log entry:", error);
            }

            return originalEnd.call(this, chunk, encoding);
        };

        next();
    };
};

module.exports = logAction;
