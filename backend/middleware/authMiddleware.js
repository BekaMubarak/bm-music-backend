const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token out of the 'Bearer <token>' string
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token authenticity
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch user profile and pass it along, leaving out the password field
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User profile missing from data records' });
      }
      
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Session expired or token verification failed' });
    }
  }
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied: No authentication token provided' });
  }
};

// Restricts routes to specific user types (e.g., only artists or only admins)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient account permissions' });
    }
    next();
  };
};

module.exports = { protect, authorize };
