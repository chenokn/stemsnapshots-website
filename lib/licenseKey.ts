import { randomInt } from "crypto";

// Crockford base32 — excludes I, L, O, U to avoid visual ambiguity when typed by hand.
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function randomGroup(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[randomInt(ALPHABET.length)];
  }
  return out;
}

// e.g. "DIGLAP-4F9K-QX2M-7RTN". Uniqueness is enforced by the database's
// UNIQUE constraint on licenses.key, not by the key's structure — this is a
// display format, not a cryptographic checksum.
export function generateLicenseKey(): string {
  return `DIGLAP-${randomGroup(4)}-${randomGroup(4)}-${randomGroup(4)}`;
}
