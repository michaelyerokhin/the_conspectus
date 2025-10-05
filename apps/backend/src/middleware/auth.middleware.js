"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const supabase_1 = require("../config/supabase");
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Access token required' });
            return;
        }
        const response = await supabase_1.supabaseAdmin.auth.getUser(token);
        const { data, error } = response;
        const user = data?.user;
        if (error || !user) {
            const message = error?.message || 'Invalid or expired token';
            res.status(403).json({ error: message });
            return;
        }
        req.user = {
            id: user.id,
            email: user.email || '',
        };
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(403).json({ error: 'Authentication failed' });
    }
};
exports.authenticateToken = authenticateToken;
