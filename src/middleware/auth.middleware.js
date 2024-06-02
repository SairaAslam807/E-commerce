import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                error: 'Token not provided',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                error: 'Invalid Token',
            });
        }

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('Error in Auth Middleware Controller', error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({
            error: 'Access denied',
        });
    }
    next();
};

export default { authenticate, authorize };
