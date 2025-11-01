import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../config/supabase";
import { getAccessTokenFromCookies } from "../utils/authCookies";
import { sendErrorMessage } from "../utils/errors";

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
): Promise<void | Response> => {
  try {
    console.log("\n===== [authenticateToken] Authenticating token =====\n");
    const authHeader = req.headers.authorization;
    let token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      token = getAccessTokenFromCookies(req.headers.cookie);
    }

    if (!token) {
      console.log("[authenticateToken] No token provided");
      return sendErrorMessage(
        res,
        401,
        "[authenticateToken] Access token required"
      );
    }

    const response = await supabaseAdmin.auth.getUser(token);
    const { data, error } = response as any; /** Consider typing this? */
    console.log("[authenticateToken] Got response from Supabase!");

    const user = data?.user;

    if (error || !user) {
      const message =
        error?.message || "[authenticateToken] An unexpected error occurred";
      console.log("User:", JSON.stringify(user));
      console.log("[authenticateToken] Error:", message);
      return sendErrorMessage(res, 403, "[authenticateToken] " + message);
    }

    req.user = {
      id: user.id,
      email: user.email || "",
    };

    console.log("[authenticateToken] Succesfully authenticted token!");
    next();
  } catch (error) {
    console.error("[authenticateToken] Auth middleware error:", error);
    return sendErrorMessage(
      res,
      403,
      "[authenticateToken] Authentication failed"
    );
  }
};
