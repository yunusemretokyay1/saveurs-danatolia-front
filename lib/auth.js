// lib/auth.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
    const token = req.cookies.token; // Get the token stored in the cookie
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        return decoded;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};
