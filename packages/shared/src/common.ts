import { z } from "zod";

export const ErrorPayloadSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.unknown()).optional(),
});

export type ErrorPayload = z.infer<typeof ErrorPayloadSchema>;