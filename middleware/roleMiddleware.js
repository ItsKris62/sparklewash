// middleware/roleMiddleware.js

const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access forbidden: insufficient rights' });
        }
        next();
    };
};

module.exports = roleMiddleware;