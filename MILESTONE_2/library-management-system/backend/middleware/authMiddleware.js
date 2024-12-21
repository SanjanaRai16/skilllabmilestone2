const jwt = require('jsonwebtoken');

// General authentication middleware
const authMiddleware = (requiredRoles = []) => {
  return (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'No token provided. Please authenticate.' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token. Please authenticate.' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired. Please log in again.' });
      }
      
      res.status(500).json({ message: 'Authentication failed. Please try again.' });
    }
  };
};

// Specific middlewares for different roles
const adminMiddleware = authMiddleware(['admin']);
const studentMiddleware = authMiddleware(['student']);

module.exports = {
  authMiddleware,
  adminMiddleware,
  studentMiddleware
};
