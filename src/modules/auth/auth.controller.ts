import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { loginSchema } from "./auth.validation";
import sendResponse from "../../common/utils/sendResponse";

class AuthController {
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validatedData = loginSchema.parse(req.body);

      const result = await authService.login(
        validatedData.email,
        validatedData.password
      );

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await authService.getCurrentUser(req.user!.id);

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Current user fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;

      const result = await authService.refresh(refreshToken);

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Token refreshed successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.logout(req.user!.id);

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Logged out successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();