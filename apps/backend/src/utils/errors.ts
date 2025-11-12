import type { Response } from "express";
import { ErrorPayloadSchema, type ErrorPayload } from "@shared/common";

/**
 * Standardized, runtime-validated error responder.
 * - Validates payload using Zod
 * - Logs invalid shapes
 * - Returns a consistent JSON error response
 */
export function sendError(
  res: Response,
  status: number,
  payload: unknown
): Response<ErrorPayload> {
  const parsed = ErrorPayloadSchema.safeParse(payload);

  if (!parsed.success) {
    console.error("Invalid error payload shape:", parsed.error.flatten());
    return res
      .status(status)
      .json({ error: "Internal error formatting failed" });
  }

  return res.status(status).json(parsed.data);
}

/**
 * Convenience wrapper for simple message errors.
 */
export function sendErrorMessage(
  res: Response,
  status: number,
  message: string,
  extra?: Partial<Omit<ErrorPayload, "error">>
): Response<ErrorPayload> {
  return sendError(res, status, { error: message, ...extra });
}
