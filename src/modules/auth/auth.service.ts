import { AppDataSource } from "../../database/data-source";
import { User } from "../user/entities/user.entity";
import AppError from "../../common/errors/AppError";
import { comparePassword } from "../../common/utils/password";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../common/utils/jwt";
import bcrypt from "bcrypt";
import { mapUserResponse } from "../user/user.mapper";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
      relations: {
        role: true,
      },
    });

    if (!user) {
      throw new AppError(401, "Invalid email or password");
    }

    if (!user.isActive) {
      throw new AppError(401, "Your account is inactive");
    }

    const isPasswordMatched = await comparePassword(
      password,
      user.passwordHash
    );

    if (!isPasswordMatched) {
      throw new AppError(401, "Invalid email or password");
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      roleId: user.roleId,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      refreshTokenId: crypto.randomUUID(),
    });

    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await this.userRepository.save(user);

    return {
      accessToken,
      refreshToken,
      user: mapUserResponse(user),
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        role: {
          rolePermissions: {
            permission: true,
          },
        },
      },
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return {
      user: mapUserResponse(user),
      role: {
        id: user.role.id,
        name: user.role.name,
      },

      permissions: user.role.rolePermissions.map(
        (rp) => rp.permission.name
      ),
    };
  }
  async refresh(refreshToken: string) {
    let payload;

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError(401, "Invalid or expired refresh token");
    }

    console.log("========================================");
    console.log("Incoming Refresh Token:");
    console.log(refreshToken);

    console.log("Decoded Payload:");
    console.log(payload);

    const user = await this.userRepository.findOne({
      where: {
        id: payload.userId,
      },
      relations: {
        role: true,
      },
    });

    if (!user) {
      throw new AppError(401, "Invalid refresh token");
    }

    console.log("User ID:", user.id);
    console.log("Stored Hash:", user.refreshTokenHash);

    if (!user.isActive) {
      throw new AppError(401, "Your account is inactive");
    }

    if (!user.refreshTokenHash) {
      throw new AppError(401, "Refresh token revoked");
    }

    const isMatched = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash
    );

    console.log("Incoming RT matches stored hash:", isMatched);

    if (!isMatched) {
      throw new AppError(401, "Refresh token revoked");
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      roleId: user.roleId,
    });

    const newRefreshToken = generateRefreshToken({
      userId: user.id,
      refreshTokenId: crypto.randomUUID(),
    });

    console.log("----------------------------------------");
    console.log("New Refresh Token:");
    console.log(newRefreshToken);

    console.log("Old === New ?", refreshToken === newRefreshToken);

    const newHash = await bcrypt.hash(newRefreshToken, 10);

    console.log(
      "Old token matches NEW hash:",
      await bcrypt.compare(refreshToken, newHash)
    );

    console.log(
      "New token matches NEW hash:",
      await bcrypt.compare(newRefreshToken, newHash)
    );

    user.refreshTokenHash = newHash;

    await this.userRepository.save(user);

    const savedUser = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });

    console.log("----------------------------------------");
    console.log("Hash after save:");
    console.log(savedUser?.refreshTokenHash);

    console.log(
      "Old token vs saved hash:",
      await bcrypt.compare(
        refreshToken,
        savedUser!.refreshTokenHash!
      )
    );

    console.log(
      "New token vs saved hash:",
      await bcrypt.compare(
        newRefreshToken,
        savedUser!.refreshTokenHash!
      )
    );

    console.log("========================================");

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
  async logout(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    user.refreshTokenHash = null;

    await this.userRepository.save(user);

    return;
  }
}

export const authService = new AuthService();