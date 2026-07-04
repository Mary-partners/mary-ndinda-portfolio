import { cookies } from "next/headers";

const COOKIE_NAME = "mcl_admin";

function expectedToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? "change-me-please";
  // A trivial, non-cryptographic derivation is sufficient for a prototype
  // gate. It only keeps the cookie value from being the raw password.
  let hash = 0;
  for (let i = 0; i < pw.length; i++) {
    hash = (hash * 31 + pw.charCodeAt(i)) | 0;
  }
  return `mcl.${(hash >>> 0).toString(16)}`;
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "change-me-please";
  return typeof password === "string" && password.length > 0 && password === expected;
}

export async function createSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return token === expectedToken();
}
