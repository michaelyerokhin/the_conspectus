/**
 * Shared types that can be used in both server and client components
 */

/** 
 * Note that this user is different from the Supabase user (has email attribute)
 * This user type is returned by supabaseAdmin.auth.admin.getUserById
 */
export type CurrentUser = {
  id: string;
  email: string;
};

