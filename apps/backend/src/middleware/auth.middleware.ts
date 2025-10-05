import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    const response = await supabaseAdmin.auth.getUser(token);
    const { data, error } = response as any;

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
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(403).json({ error: 'Authentication failed' });
  }
};