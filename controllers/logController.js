const Log = require('../models/Log');
const { Parser } = require('json2csv'); // For exporting CSV files

const getLogs = async (req, res) => {
  try {
    const { type, userId, orderId, startDate, endDate, page = 1, limit = 20 } = req.query;

    // Build filter based on query params
    const filter = {};
    if (type) filter.type = type;
    if (userId) filter.user = userId;
    if (orderId) filter['metadata.orderId'] = orderId;
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    // Fetch logs with pagination
    const logs = await Log.find(filter)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const totalLogs = await Log.countDocuments(filter);
    
    res.status(200).json({ logs, totalLogs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs', error: error.message }); // Include error message
  }
};

// Export logs as CSV file
const exportLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    
    // Define CSV fields and parse logs into CSV
    const fields = ['timestamp', 'user', 'action', 'path', 'method', 'description', 'status'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(logs);

    // Set response headers and send CSV file
    res.header('Content-Type', 'text/csv');
    res.attachment('logs.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Failed to export logs' });
  }
};

const createLog = async (req, res) => {
  try {
      const logData = req.body; // Assuming log data is sent in the request body
      const newLog = new Log(logData);
      await newLog.save();
      res.status(201).json(newLog);
  } catch (error) {
      res.status(500).json({ message: 'Failed to create log' });
  }
};

module.exports = { getLogs, exportLogs, createLog};
