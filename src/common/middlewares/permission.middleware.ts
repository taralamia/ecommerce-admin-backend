import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../modules/user/entities/user.entity";

export function permissionMiddleware(requiredPermission: string) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return next(new AppError(401, "Unauthorized"));
    }

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: req.user.id,
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
      return next(new AppError(401, "Unauthorized"));
    }

    const permissions = user.role.rolePermissions.map(
      (rolePermission) => rolePermission.permission.name
    );

    if (!permissions.includes(requiredPermission)) {
      return next(new AppError(403, "Forbidden"));
    }

    next();
  };
}