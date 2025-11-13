import "server-only";
import { cookies } from "next/headers";
import type { CurrentUser } from "./types";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const apiOrigin = process.env.NEXT_PUBLIC_CRUD_BACKEND_URL;

  if (!apiOrigin) {
    console.warn("[auth] API origin is not configured; skipping user lookup");
    return null;
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  try {
    const response = await fetch(`${apiOrigin}/api/auth/me`, {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      user?: CurrentUser;
    };

    return payload.user ?? null;
  } catch (error) {
    console.error("[auth] Failed to retrieve current user", error);
    return null;
  }
}
