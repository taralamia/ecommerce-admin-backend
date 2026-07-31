import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;

export async function hashPassword(password: string): Promise<string> {
  if (!password || password.length === 0) {
    throw new Error("Password cannot be empty");
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
  }

  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    throw new Error(`Failed to hash password: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  if (!plainPassword || plainPassword.length === 0) {
    return false;
  }

  if (!hashedPassword || hashedPassword.length === 0) {
    return false;
  }

  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Password comparison failed:", error instanceof Error ? error.message : "Unknown error");
    return false;
  }
}