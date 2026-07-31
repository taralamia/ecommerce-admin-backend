import jwt, { SignOptions } from "jsonwebtoken";
import {config} from "../../config/env.config";

export interface JwtAccessPayload {
  userId: string;
  email: string;
  roleId: string;
}

export interface JwtRefreshPayload {
  userId: string;
  refreshTokenId: string;
}

export interface JwtAccessTokenResponse {
  token: string;
  expiresIn: string; // e.g., '900' or '15m' or '7d'
}

/**
 * Generate an access token (short-lived)
 */
export function generateAccessToken(payload: JwtAccessPayload): JwtAccessTokenResponse {
  const options: SignOptions = {
    expiresIn: config.jwt.access.expiresIn as SignOptions["expiresIn"],
    algorithm: "HS256",
  };

  const token = jwt.sign(payload, config.jwt.access.secret, options);

  return {
    token,
    expiresIn: config.jwt.access.expiresIn,
  };
}

/**
 * Generate a refresh token (long-lived)
 */
export function generateRefreshToken(payload: JwtRefreshPayload): string {
  const options: SignOptions = {
    expiresIn: config.jwt.refresh.expiresIn as SignOptions["expiresIn"],
    algorithm: "HS256",
  };

  return jwt.sign(payload, config.jwt.refresh.secret, options);
}

/**
 * Verify an access token
 * @throws {JsonWebTokenError} If token is invalid or expired
 */
export function verifyAccessToken(token: string): JwtAccessPayload {
  return jwt.verify(token, config.jwt.access.secret) as JwtAccessPayload;
}

/**
 * Verify a refresh token
 * @throws {JsonWebTokenError} If token is invalid or expired
 */
export function verifyRefreshToken(token: string): JwtRefreshPayload {
  return jwt.verify(token, config.jwt.refresh.secret) as JwtRefreshPayload;
}