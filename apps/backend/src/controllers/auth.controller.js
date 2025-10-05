"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.getCurrentUser = exports.login = void 0;
const supabase_1 = require("../config/supabase");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if email and password exist
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        // Ask Supabase: is this email/password correct?
        const { data, error } = await supabase_1.supabaseAdmin.auth.signInWithPassword({
            email,
            password,
        });
        // If login failed or shape is unexpected
        if (error || !data || !data.user || !data.session) {
            // prefer returning Supabase message in dev, but keep generic for production
            const message = error?.message || 'Invalid email or password';
            res.status(401).json({ error: message });
            return;
        }
        // Success - send back user info and token
        res.status(200).json({
            user: {
                id: data.user.id,
                email: data.user.email,
            },
            session: {
                access_token: data.session.access_token,
                expires_in: data.session.expires_in,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Not authenticated' });
            return;
        }
        const { data, error } = await supabase_1.supabaseAdmin.auth.admin.getUserById(req.user.id);
        if (error || !data || !data.user) {
            const message = error?.message || 'User not found';
            res.status(404).json({ error: message });
            return;
        }
        res.status(200).json({
            user: {
                id: data.user.id,
                email: data.user.email,
            },
        });
    }
    catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCurrentUser = getCurrentUser;
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const { data, error } = await supabase_1.supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                name: name || '',
            },
        });
        if (error || !data || !data.user) {
            const message = error?.message || 'Failed to create user';
            res.status(400).json({ error: message });
            return;
        }
        const { data: sessionData, error: signInError } = await supabase_1.supabaseAdmin.auth.signInWithPassword({
            email,
            password,
        });
        if (signInError || !sessionData || !sessionData.session) {
            const message = signInError?.message || 'Failed to sign in new user';
            res.status(400).json({ error: message });
            return;
        }
        res.status(201).json({
            user: {
                id: data.user.id,
                email: data.user.email,
                name: data.user.user_metadata?.name || '',
            },
            session: {
                access_token: sessionData.session.access_token,
                expires_in: sessionData.session.expires_in,
            },
        });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.register = register;
