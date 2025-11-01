import { Request, Response } from "express";
import { supabaseAdmin } from "../config/supabase";
import { clearAuthCookies, setAuthCookies } from "../utils/authCookies";
import { sendErrorMessage } from "../utils/errors";

/**
 * Login endpoint.
 *
 * Accepts { email, password } in the request body. Uses Supabase `signInWithPassword`
 * to verify credentials and returns a small user object and session token on success.
 *
 * Inputs:
 * - req.body.email: string
 * - req.body.password: string
 *
 * Success response (200): { user: { id, email }, session: { access_token, expires_in } }
 * Error responses:
 * - 400: missing email/password
 * - 401: invalid credentials
 * - 500: internal server error
 *
 * Note: This is a public endpoint (no auth required).
 */
export const login = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    console.log("[login] Attempting to login!");
    const { email, password } = req.body;

    if (!email || !password) {
      console.error("[login] Both Email and password are required!");
      return sendErrorMessage(res, 400, "Both Email and password are required");
    }

    console.log("[login] Attempting to login with Supabase now!");
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data || !data.user || !data.session) {
      const message = error?.message || "Invalid email or password";
      console.error(`[login] Error: ${message}`);
      return sendErrorMessage(res, 401, message);
    }

    console.log("[login] Logged in succesfully!");
    setAuthCookies(res, data.session);

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
  } catch (error) {
    console.error("[login] Login error:", error);
    return sendErrorMessage(res, 500, "Internal server error", {
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * Get current authenticated user.
 *
 * Requires `authenticateToken` middleware to have set `req.user`.
 * Returns Supabase admin user record for the current user id.
 *
 * Success response (200): { user }
 * Error responses:
 * - 401: not authenticated (missing req.user)
 * - 404: user not found
 * - 500: internal server error
 */
export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    console.log("\n===== [getCurrentUser] Attempting to get Current User! =====\n");
    if (!req.user) {
      console.log("[getCurrentUser] User not found in the request!");
      return sendErrorMessage(res, 401, "Not authenticated");
    } 

    const { data, error } = await supabaseAdmin.auth.admin.getUserById(
      req.user.id
    );

    if (error || !data || !data.user) {
      const message = error?.message || "User not found";
      console.log(`[getCurrentUser] Error: ${message}`);
      return sendErrorMessage(res, 404, message);
    }

    console.log("[getCurrentUser] Succesfully found user!");
    res.status(200).json({
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (error) {
    console.error("[getCurrentUser] Get current user error:", error);
    return sendErrorMessage(res, 500, "Internal server error", {
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * Register endpoint.
 *
 * Creates a new Supabase auth user using the admin API, then signs them in to
 * return an initial session token. Accepts { email, password, name } in the body.
 *
 * Success response (201): { user, session }
 * Error responses:
 * - 400: missing email/password or creation/sign-in failure
 * - 500: internal server error
 *
 * Note: This endpoint performs admin operations and should be protected or rate
 * limited in production. It uses the service role key on the server.
 */
export const signup = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    console.log("\n===== [signup] Attempting to Register =====\n");
    const { email, password, name } = req.body;

    if (!email || !password) {
      console.log("[signup] No email or password!");
      return sendErrorMessage(res, 400, "[signup] Email and password are required");
    }
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name: name || "",
      },
    });

    if (error || !data || !data.user) {
      const message = error?.message || "Failed to create user";
      console.log(`[signup] Error: ${message}`);
      return sendErrorMessage(res, 400, message);
    }

    console.log("[signup] Attepmting to register with Supabase now!");
    const { data: sessionData, error: signInError } =
      await supabaseAdmin.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError || !sessionData || !sessionData.session) {
      const message = signInError?.message || "Failed to sign in new user";
      console.log(`[signup] Failed to sign in new user: ${message}`);
      return sendErrorMessage(res, 400, message);
    }

    setAuthCookies(res, sessionData.session);

    res.status(201).json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || "",
      },
      session: {
        access_token: sessionData.session.access_token,
        expires_in: sessionData.session.expires_in,
      },
    });

    console.log("[signup] Succesfully registered user!");
  } catch (error) {
    console.error("[signup] Register error:", error);
    return sendErrorMessage(res, 500, "Internal server error", {
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * Logout endpoint.
 *
 * Clears authentication cookies and revokes Supabase sessions for the current user.
 *
 * Success response (204): no content
 * Error responses:
 * - 500: failed to revoke session
 */
export const logout = async (_req: Request, res: Response): Promise<void | Response> => {
  try {
    console.log("[logout] Attempting to logout now!");
    clearAuthCookies(res);
    console.log("[logout] Logged out succesfully!");
    res.status(204).send();
  } catch (error) {
    console.error("[logout] Logout error:", error);
    return sendErrorMessage(res, 500, "Internal server error", {
      code: "INTERNAL_ERROR",
    });
  }
};
