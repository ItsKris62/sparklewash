require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
// const { securityMiddleware } = require('./middleware/securityMiddleware'); // Security middleware commented out
const logAction = require('./middleware/logMiddleware');
// const limiter = require('./middleware/rateLimitMiddleware'); // Rate limiter middleware commented out
const http = require('http');
const { Server} = require('socket.io'); // Socket.io middleware, function to pass the io instance to the order controller
const { initOrderController } = require('./controllers/orderController'); // OrderController middleware, integrate for real-time communication

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app); // create HTTP server instance

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600,
    preflightContinue: true
};

// Apply CORS before other middleware
app.use(cors(corsOptions));

// Socket.io configuration
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT']
    }
});

// Initialize Socket.io
io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });
});

// Initialize order controller with io instance
initOrderController(io);

// Add headers middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Security Middleware
// securityMiddleware(app); // Commented out for testing

// Body Parser
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(logAction('API_REQUEST'));

// Rate Limiter
// app.use(limiter); // Commented out for testing

// Add request timing middleware
app.use((req, res, next) => {
    // Capture the start time of the request
    req._startTime = Date.now();
    next();
});

// Global Logging Middleware
app.use(logAction('API_REQUEST'));

// Define a simple route for the base URL
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const analyticsRoutes = require('./routes/analyticsRoute');
const pointsRoutes = require('./routes/pointsRoutes');
const logRoutes = require('./routes/logRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const reportRoutes = require('./routes/reportsRoutes');


// API Routes with specific logging
app.use('/api/auth', logAction('AUTH_REQUEST'), authRoutes);
app.use('/api/users', logAction('USER_REQUEST'), userRoutes);
app.use('/api/admin', logAction('ADMIN_REQUEST'), adminRoutes);
app.use('/api/orders', logAction('ORDER_REQUEST'), orderRoutes);
app.use('/api/services', logAction('SERVICE_REQUEST'), serviceRoutes);
app.use('/api/analytics', logAction('ANALYTICS_REQUEST'), analyticsRoutes);
app.use('/api/points', logAction('POINTS_REQUEST'), pointsRoutes);
app.use('/api/logs', logAction('LOGS_REQUEST'), logRoutes);
app.use('/api/notifications', logAction('NOTIFICATION_REQUEST'), notificationRoutes);
app.use('/api/reports', reportRoutes);


// Error Handling Middleware
app.use(errorHandler);

// Handle 404 errors
app.use(notFound);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Unhandled Rejection Handler
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
