import { z } from "zod";
import type { ErrorPayload } from "@shared/common";
import type { Response } from "express";

/** === Zod Schemas (runtime validation) === */
const PublicUserSchema = z
  .object({
    id: z.string().uuid(),
    display_name: z.string(),
    created_at: z.string(), /** .datetime() does not work for formatting reasons */
    updated_at: z.string(), /** .datetime() does not work for formatting reasons */
  })
  .strict(); /** Disallow unknown keys! */

const PublicUserListSchema = z.array(PublicUserSchema);

export const PublicUserResponseSchema = z.object({
  user: PublicUserSchema,
});

export const PublicUserListResponseSchema = z.object({
  users: PublicUserListSchema,
});

/** === Inferred Types (compile-time only) === */
type PublicUserResponse = z.infer<typeof PublicUserResponseSchema>;
type PublicUserListResponse = z.infer<typeof PublicUserListResponseSchema>;

/** === Response Types === */
export type UserResponse = Response<PublicUserResponse | ErrorPayload>;
export type UserListResponse = Response<PublicUserListResponse | ErrorPayload>;
