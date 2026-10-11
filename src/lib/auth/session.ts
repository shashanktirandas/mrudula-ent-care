import { createHash, randomBytes } from "node:crypto";

const SESSION_TOKEN_BYTES = 32;

export function createSessionToken() {
  const token = randomBytes(SESSION_TOKEN_BYTES).toString("base64url");

  return {
    token,
    tokenHash: hashSessionToken(token),
  };
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}