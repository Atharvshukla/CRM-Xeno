const jwt = require('jsonwebtoken');

exports.customerProtect = (req, res, next) => {
    // Get the token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    
    // If no token provided, return Unauthorized error
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access, token missing' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if decoded token contains required fields
        if (!decoded.customerId || !decoded.companyId) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Attach the decoded information to the request object
        req.customer = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token', error: err.message });
    }
};
