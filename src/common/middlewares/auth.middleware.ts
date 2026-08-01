import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../database/data-source";
import AppError from "../errors/AppError";
import { verifyAccessToken } from "../utils/jwt";
import { User } from "../../modules/user/entities/user.entity";

const userRepository = AppDataSource.getRepository(User);

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError(401, "Authentication required"));
  }

  if (!authHeader.startsWith("Bearer ")) {
    return next(new AppError(401, "Invalid authorization header"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);

    const user = await userRepository.findOne({
      where: {
        id: payload.userId,
      },
      relations: {
        role: true,
      },
    });

    if (!user) {
      return next(new AppError(401, "User not found"));
    }

    if (!user.isActive) {
      return next(new AppError(401, "Account is inactive"));
    }

    req.user = user;

    next();
  } catch {
    return next(new AppError(401, "Invalid or expired token"));
  }
}