// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware'); // Custom error handler middleware



// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON payloads

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');

const serviceRoutes = require('./routes/serviceRoutes');
const analyticsRoutes = require('./routes/analyticsRoute');


// API Routes
app.use('/api/auth', authRoutes);        // Authentication routes (register, login)
app.use('/api/users', userRoutes);       // User-specific routes (profile management)
app.use('/api/admin', adminRoutes);      // Admin-specific routes (user and order management)
app.use('/api/orders', orderRoutes);     // Order routes (create, status update)

app.use('/api/services', serviceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes); // Analytics routes

// Error Handling Middleware
app.use(errorHandler); // Custom error handler for improved error response

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
