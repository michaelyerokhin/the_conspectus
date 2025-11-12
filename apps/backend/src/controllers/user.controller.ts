import { Request, Response } from "express";
import {
  PublicUserListResponseSchema,
  PublicUserResponseSchema,
  type UserResponse,
  type UserListResponse,
} from "@shared/user";
import { supabaseAdmin } from "../config/supabase";
import { sendErrorMessage } from "../utils/errors";

/**
 * Get a user by id (admin).
 *
 * Params:
 * - req.params.id: string
 *! This is the user_id field!
 *
 * Success (200): { user }
 * Errors:
 * - 400: missing id
 * - 404: user not found
 * - 500: internal server error
 *
 * Requires service role privileges (server-side only).
 */
export const getUserById = async (
  req: Request,
  res: UserResponse
): Promise<void | Response> => {
  try {
    console.log("\n===== [getUserById] Getting a specific user =====\n");
    const { id } = req.params;
    if (!id) {
      console.error("[getUserById] User id is required!");
      return sendErrorMessage(res, 400, "[getUserById] User id is required!");
    }

    console.log("[getUserById] Getting user from Supabase now!");
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      const message = error?.message || "[getUserById] User not found";
      console.error(`[getUserById] Error: ${message}`);
      return sendErrorMessage(res, 404, message, {
        code: "USER_NOT_FOUND",
      });
    }

    console.log("[getUserById] Succesfully found user!");
    console.log("[getUserById] Parsing user now!");
    const parsed = PublicUserResponseSchema.safeParse({ user: data });

    if (!parsed.success) {
      console.error("[getUserById] Unexpected user shape", parsed.error.flatten());
      return sendErrorMessage(
        res,
        500,
        "[getUserById] Invalid user data returned",
        {
          code: "INVALID_SCHEMA",
        }
      );
    }

    console.log(`[getUserById] Found user!`);
    return res.status(200).json(parsed.data);
  } catch (err) {
    console.error("[getUserById] error:", err);
    return sendErrorMessage(res, 500, "[getUserById] Internal server error", {
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * Update a user's attributes (admin).
 *
 * Params:
 * - req.params.id: string
 * - req.body: partial user attributes accepted by Supabase admin.updateUserById
 *
 * Success (200): { user }
 * Errors:
 * - 400: missing id or update failure
 * - 500: internal server error
 *
 * Requires service role privileges (server-side only).
 */
export const updateUser = async (
  req: Request,
  res: UserResponse
): Promise<void | Response> => {
  try {
    console.log("\n===== [updateUser] Updating User =====\n");
    const { id } = req.params;
    const updates = req.body;
    if (!id) {
      console.error("[updateUser] User id is required!");
      return sendErrorMessage(res, 400, "[updateUser] User id is required");
    }

    console.log("[updateUser] Updating user with Supabase now!");
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error || !data) {
      const message = error?.message || "[updateUser] Failed to update user";
      console.error(`[updateUser] Error: ${message}`);
      return sendErrorMessage(res, 400, message);
    }

    console.log("[updateUser] Succesfully updated user!");
    console.log("[updateUser] Parsing user now!");
    const parsed = PublicUserResponseSchema.safeParse({ user: data });
    if (!parsed.success) {
      console.error(
        "[updateUser] Unexpected user shape",
        parsed.error.flatten()
      );
      return sendErrorMessage(
        res,
        500,
        "[updateUser] Invalid user data returned",
        {
          code: "INVALID_SCHEMA",
        }
      );
    }

    console.log("[updateUser] User updated and parsed succesfully!");
    return res.status(200).json(parsed.data);
  } catch (err) {
    console.error("[updateUser] error:", err);
    return sendErrorMessage(res, 500, "[updateUser] Internal server error", {
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * Delete a user by id (admin).
 *
 * Params:
 * - req.params.id: string
 *
 * Success (204): no content
 * Errors:
 * - 400: missing id or deletion failure
 * - 500: internal server error
 *
 * Requires service role privileges (server-side only).
 */
export const deleteUser = async (
  req: Request,
  res: UserResponse
): Promise<void | Response> => {
  try {
    console.log("\n===== [deleteUser] Deleting User =====\n");
    const { id } = req.params;
    if (!id) {
      console.error("[deleteUser] User id is required!");
      return sendErrorMessage(res, 400, "[deleteUser] User id is required");
    }

    console.log("[deleteUser] Deleting user with Supabase now!");
    const { error } = await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("id", id);
    if (error) {
      console.error(`[deleteUser] Error: ${error}`);
      return sendErrorMessage(res, 400, error.message);
    }

    console.log("[deleteUser] Succesfully deleted user!");
    res.status(204).send();
  } catch (err) {
    console.error("[deleteUser] error:", err);
    return sendErrorMessage(res, 500, "[deleteUser] Internal server error", {
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * List users
 * Returns: { users: Array }
 */
export const listUsers = async (
  req: Request,
  res: UserListResponse
): Promise<void | Response> => {
  const limit = Math.min(
    parseInt((req.query.limit as string) || "100", 10),
    500
  );
  const offset = Math.max(parseInt((req.query.offset as string) || "0", 10), 0);

  try {
    console.log("\n===== [listUsers] Listing Users =====\n");
    console.log(
      "[listUsers] Fetching users with limit:",
      limit,
      "offset:",
      offset
    );
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("[listUsers] Error fetching users:", error);
      return sendErrorMessage(res, 500, "[listUsers] Internal server error", {
        code: "INTERNAL_ERROR",
      });
    }

    if (!data) {
      console.log("[listUsers] No users found!");
      return sendErrorMessage(res, 404, "[listUsers] No users found");
    }

    console.log("[listUsers] Users found succesfully!");
    console.log("[listUsers] Parsing users now!");
    const parsed = PublicUserListResponseSchema.safeParse({
      users: data,
    });
    if (!parsed.success) {
      console.error(
        "[listUsers] Unexpected user shape",
        parsed.error.flatten()
      );
      return sendErrorMessage(
        res,
        500,
        "[listUsers] Invalid user data returned",
        {
          code: "INVALID_SCHEMA",
        }
      );
    }

    console.log("[listUsers] Users parsed and returned succesfully!");
    return res.status(200).json(parsed.data);
  } catch (err) {
    console.error("[listUsers] error:", err);
    return sendErrorMessage(res, 500, "[listUsers] Internal server error", {
      code: "INTERNAL_ERROR",
    });
  }
};
