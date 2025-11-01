import { z } from "zod";
import type { ErrorPayload } from "@shared/common";
import type { Response } from "express";

/** === Zod Schemas (runtime validation) === */
const PublicProfileSchema = z
  .object({
    id: z.string().uuid(),
    first_name: z.string(),
    last_name: z.string(),
    globalism: z.number().nullable().optional(),
  })
  .strict(); /** Disallow unknown keys! */

const PublicProfileListSchema = z.array(PublicProfileSchema);

export const PublicProfileResponseSchema = z.object({
  profile: PublicProfileSchema,
});

export const PublicProfileListResponseSchema = z.object({
  profiles: PublicProfileListSchema,
});

/** === Inferred Types (compile-time only) === */
type PublicProfileResponse = z.infer<typeof PublicProfileResponseSchema>;
type PublicProfileListResponse = z.infer<
  typeof PublicProfileListResponseSchema
>;

/** === Response Types === */
export type ProfileResponse = Response<PublicProfileResponse | ErrorPayload>;
export type ProfileListResponse = Response<
  PublicProfileListResponse | ErrorPayload
>;
