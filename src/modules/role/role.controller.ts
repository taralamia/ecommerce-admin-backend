import { Request, Response, NextFunction } from "express";
import { roleService } from "./role.service";
import sendResponse from "../../common/utils/sendResponse";

class RoleController {
  async createRole(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await roleService.createRole(req.body);

      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Role created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRoles(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await roleService.getRoles();

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Roles fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const roleController = new RoleController();