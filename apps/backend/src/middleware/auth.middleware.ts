import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { getAccessTokenFromCookies } from '../utils/authCookies';

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

/**
 * Express middleware to authenticate requests using a Bearer access token.
 *
 * Behavior:
 * - Reads `Authorization: Bearer <token>` header
 * - Calls `supabaseAdmin.auth.getUser(token)` to validate the token and populate
 *   `req.user = { id, email }` on success.
 *
 * Responses:
 * - 401: missing token
 * - 403: invalid/expired token
 * - 403: authentication failed (internal)
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('\n===== Authenticating token =====\n');
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    let token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      token = getAccessTokenFromCookies(req.headers.cookie);
    }

    if (!token) {
      console.log('No token provided');
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    const response = await supabaseAdmin.auth.getUser(token);
    const { data, error } = response as any; /** Consider typing this? */
    console.log('Got response from Supabase!');

    const user = data?.user;

    if (error || !user) {
      const message = error?.message || 'An unexpected error occurred';
      console.log("User:", JSON.stringify(user));
      console.log('Error:', message);
      res.status(403).json({ error: message });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email || '',
    };

    console.log("Succesfully authenticted token!")
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(403).json({ error: 'Authentication failed' });
  }
};
