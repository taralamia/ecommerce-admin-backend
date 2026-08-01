import { AppDataSource } from "../../database/data-source";
import { User } from "../user/entities/user.entity";
import AppError from "../../common/errors/AppError";
import { comparePassword } from "../../common/utils/password";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/jwt";
import * as bcrypt from "bcrypt";
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

    return mapUserResponse(user);
  }
}

export const authService = new AuthService();