// controllers/logExportController.js
const Log = require('../models/Log');
const { Parser } = require('json2csv');

// Export logs as CSV
exports.exportLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    
    // Convert logs to CSV
    const fields = ['timestamp', 'user', 'action', 'path', 'method', 'description', 'status'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(logs);

    res.header('Content-Type', 'text/csv');
    res.attachment('logs.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Failed to export logs' });
  }
};