import type { Request, Response } from "express";
import {
  PublicProfileListResponseSchema,
  PublicProfileResponseSchema,
  type ProfileResponse,
  type ProfileListResponse,
} from "@shared/profile";
import { supabaseAdmin } from "../config/supabase";
import { sendErrorMessage } from "../utils/errors";

/**
 * Get user profiles (all).
 *
 * Success (200): { profiles: PublicProfile[] }
 * Errors:
 * - 404: no profiles found
 * - 500: internal server error
 */
export const getAllProfiles = async (
  _req: Request,
  res: ProfileListResponse
): Promise<void | Response> => {
  try {
    console.log("\n===== [getAllProfiles] Getting all profiles =====\n");

    const { data, error } = await supabaseAdmin
      .from("public_profiles")
      .select("id, first_name, last_name");

    if (error) {
      console.error("[getAllProfiles] Supabase error:", error.message);
      return sendErrorMessage(res, 500, error.message, {
        code: "SUPABASE_ERROR",
      });
    }

    if (!data || data.length === 0) {
      console.log("[getAllProfiles] No matching profiles found!");
      return sendErrorMessage(res, 404, "No matching profiles found");
    }

    const parsed = PublicProfileListResponseSchema.safeParse({
      profiles: data,
    });
    if (!parsed.success) {
      console.error(
        "[getAllProfiles] Unexpected profile shape:",
        parsed.error.flatten()
      );
      return sendErrorMessage(res, 500, "Invalid profile data returned", {
        code: "INVALID_SCHEMA",
      });
    }

    console.log(`[getAllProfiles] Found ${parsed.data.profiles.length} profile(s)!`);
    res.status(200).json(parsed.data);
  } catch (err) {
    console.error("[getAllProfiles] Error:", err);
    return sendErrorMessage(res, 500, "Internal server error", {
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * Get a user by id (admin).
 *
 * Params:
 * - req.params.id: string
 *
 * Success (200): { profile: PublicProfile }
 * Errors:
 * - 400: missing id
 * - 404: user not found
 * - 500: internal server error
 */
export const getProfileById = async (
  req: Request,
  res: ProfileResponse
): Promise<void | Response> => {
  try {
    console.log("\n===== [getProfileById] Searching profiles by ID =====\n");

    const id = req.params.id;
    if (!id) {
      console.error("[getProfileById] ID is required!");
      return sendErrorMessage(res, 400, "ID is required");
    }

    const { data, error } = await supabaseAdmin
      .from("public_profiles")
      .select("id, first_name, last_name, globalism")
      .eq("id", id)
      .single();

    if (error) {
      console.error("[getProfileById] Supabase error:", error.message);
      return sendErrorMessage(res, 500, error.message, {
        code: "SUPABASE_ERROR",
      });
    }

    if (!data) {
      console.log("[getProfileById] No matching profiles found");
      return sendErrorMessage(res, 404, "No matching profiles found");
    }

    const parsed = PublicProfileResponseSchema.safeParse({ profile: data });
    if (!parsed.success) {
      console.error(
        "[getProfileById] Unexpected profile shape",
        parsed.error.flatten()
      );
      return sendErrorMessage(res, 500, "Invalid profile data returned", {
        code: "INVALID_SCHEMA",
      });
    }

    console.log(`Found profile!`);
    res.status(200).json(parsed.data);
  } catch (err) {
    console.error("[getProfileById] error:", err);
    return sendErrorMessage(res, 500, "Internal server error", {
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * Get user profiles by first name (search).
 *
 * Query params:
 * - req.query.name: string
 *
 * Success (200): { profiles: PublicProfile[] }
 * Errors:
 * - 400: missing name
 * - 404: no profiles found
 * - 500: internal server error
 */
export const getProfilesByFirstName = async (
  req: Request,
  res: ProfileListResponse
): Promise<void | Response> => {
  try {
    console.log("\n===== [getProfilesByFirstName] Searching profiles by first name =====\n");

    const rawName = Array.isArray(req.query.name)
      ? req.query.name[0]
      : req.query.name;
    const name = rawName?.toString().trim();
    if (!name) {
      console.error("[getProfilesByFirstName] Name is required!");
      return sendErrorMessage(res, 400, "Name is required");
    }

    const { data, error } = await supabaseAdmin
      .from("public_profiles")
      .select("id, first_name, last_name")
      .or(`first_name.ilike.%${name}%,last_name.ilike.%${name}%`)
      .limit(10);

    if (error) {
      console.error("[getProfilesByFirstName] Supabase error:", error.message);
      return sendErrorMessage(res, 500, error.message, {
        code: "SUPABASE_ERROR",
      });
    }

    if (!data || data.length === 0) {
      return sendErrorMessage(res, 404, "No matching profiles found");
    }

    const parsed = PublicProfileListResponseSchema.safeParse({
      profiles: data,
    });
    if (!parsed.success) {
      console.error(
        "[getProfilesByFirstName] Unexpected profile shape",
        parsed.error.flatten()
      );
      return sendErrorMessage(res, 500, "Invalid profile data returned", {
        code: "INVALID_SCHEMA",
      });
    }

    console.log(`Found ${data.length} profile(s)!`);
    res.status(200).json(parsed.data);
  } catch (err) {
    console.error("[getProfilesByFirstName] error:", err);
    return sendErrorMessage(res, 500, "Internal server error", {
      code: "INTERNAL_ERROR",
    });
  }
};
