import { Request, Response } from "express";
import { supabaseAdmin } from "../config/supabase";

/**
 * Get user profiles by first name (search).
 *
 * Success (200): { profiles: [{ id, first_name, last_name }] }
 * Errors:
 * - 200: profiles found
 * - 404: no profiles found
 * - 500: internal server error
 */
export const getAllProfiles = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("\n===== Getting all profiles =====\n");
    console.log(`Searching Supabase for profiles now!`);

    const { data, error } = await supabaseAdmin
      .from("public_profiles")
      .select("id, first_name, last_name");

    if (error) {
      console.error("Supabase error:", error.message);
      res.status(500).json({ error: error.message || "Supabase Error!" });
      return;
    }

    if (!data || data.length === 0) {
      console.log("No profiles found!");
      res.status(404).json({ error: "No matching profiles found" });
      return;
    }

    console.log(`Found ${data.length} profile(s)!`);
    res.status(200).json({ profiles: data });
  } catch (err) {
    console.error("getAllProfiles error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get a user by id (admin).
 *
 * Params:
 * - req.params.id: string
 *
 * Success (200): { user }  // === TODO: type this for later too ==== //
 * Errors:
 * - 400: missing id
 * - 404: user not found
 * - 500: internal server error
 *
 * Requires service role privileges (server-side only).
 */
export const getProfileById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("\n===== Searching profiles by ID =====\n");

    const id = req.params.id;
    if (!id) {
      console.error("ID is required!");
      res.status(400).json({ error: "ID is required!" });
      return;
    }

    console.log(`Searching Supabase for ID: ${id}`);

    const { data, error } = await supabaseAdmin
      .from("public_profiles")
      .select("id, first_name, last_name, globlalism")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", error.message);
      res.status(500).json({ error: error.message || "Supabase Error!" });
      return;
    }

    if (!data) {
      console.log("No profiles found!");
      res.status(404).json({ error: "No matching profiles found" });
      return;
    }

    res.status(200).json({ profiles: data });
  } catch (err) {
    console.error("getProfileById error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get user profiles by first name (search).
 *
 * Query params:
 * - req.query.name: string
 *
 * Success (200): { profiles: [{ id, first_name, last_name }] }
 * Errors:
 * - 400: missing name
 * - 404: no profiles found
 * - 500: internal server error
 */
export const getProfilesByFirstName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("\n===== Searching profiles by first name =====\n");

    const name = req.query.name?.toString();
    if (!name) {
      console.error("Name is required!");
      res.status(400).json({ error: "Name is required!" });
      return;
    }

    console.log(`Searching Supabase for name: ${name}`);

    const { data, error } = await supabaseAdmin
      .from("public_profiles")
      .select("id, first_name, last_name")
      .or(`first_name.ilike.%${name}%,last_name.ilike.%${name}%`)
      .limit(10);

    if (error) {
      console.error("Supabase error:", error.message);
      res.status(500).json({ error: error.message || "Supabase Error!" });
      return;
    }

    if (!data || data.length === 0) {
      console.log("No profiles found!");
      res.status(404).json({ error: "No matching profiles found" });
      return;
    }

    console.log(`Found ${data.length} profile(s)!`);
    res.status(200).json({ profiles: data });
  } catch (err) {
    console.error("getProfilesByFirstName error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
