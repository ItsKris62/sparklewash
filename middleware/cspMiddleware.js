const express = require('express');
const { cspMiddleware } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// Use the CSP middleware for all routes
app.use(cspMiddleware);

// Your routes go here
app.post('/api/auth/register', (req, res) => {
    // Registration logic
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});