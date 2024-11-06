const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const securityMiddleware = (app) => {
    // Set security HTTP headers
    app.use(helmet());

    // Rate limiting
    const limiter = rateLimit({
        max: 500, // Limit each IP to 100 requests per windowMs
        windowMs: 15 * 60 * 1000, // 15 minutes
        message: 'Too many requests from this IP, please try again after 15 mins!',
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
    app.use('/api', limiter);

    // Data sanitization against NoSQL query injection
    app.use(mongoSanitize());

    // Data sanitization against XSS
    app.use(xss());

    // Prevent parameter pollution
    app.use(hpp());
};

module.exports = { securityMiddleware };