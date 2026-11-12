import crypto from "crypto";

// Password hashing with Node's built-in scrypt (no external dependency).
// Stored format: scrypt$<saltHex>$<derivedKeyHex>

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const dk = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${dk}`;
}

export function verifyPassword(password: string, stored: string | null | undefined): boolean {
  if (!stored) return false;
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const [, salt, dk] = parts;
  let calc: Buffer;
  try {
    calc = crypto.scryptSync(password, salt, 64);
  } catch {
    return false;
  }
  const expected = Buffer.from(dk, "hex");
  return calc.length === expected.length && crypto.timingSafeEqual(calc, expected);
}
